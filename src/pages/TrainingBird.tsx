import { Container, Paper } from '@mui/material'
import p5 from 'p5'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
import { Bird } from '../modules/Bird'
import { BirdBrain } from '../modules/BirdBrain'
import { Pipe } from '../modules/Pipe'


export function TrainingBird () {
  const TOTAL_BIRDS = 300
  const PIPES_SPEED = 4 // 4 or less or not possible with this gravity
  const PIPES_GAP = 150

  let birds: Bird[] = []
  let birdBrains: BirdBrain[] = []

  let lastBirdBrain: string

  let pipes: Pipe[] = []
  let score = 0
  let maxScore = 0
  let isOver = false

  let pipeBodySprite: p5.Image
  let pipePeakSprite: p5.Image
  let birdSprites: p5.Image[]


  function sketch (p: P5CanvasInstance) {
    p.preload = () => {
      pipeBodySprite = p.loadImage('flappy-bird/pipe.svg')
      pipePeakSprite = p.loadImage('flappy-bird/pipe.svg')
      birdSprites = [
        p.loadImage('flappy-bird/rocket-frame-0.svg'),
        p.loadImage('flappy-bird/rocket-frame-1.svg'),
      ]
    }
    p.setup = () => {
      p.createCanvas(800, 600)
      reset()
    }

    p.keyPressed = () => {
      if (p.key === ' ') {
        reset() //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.
      }
    }

    p.touchStarted = () => {
      if (isOver) reset()
    }

    p.draw = () => {
      p.background(0, 80, 255)
      for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update()
        pipes[i].show()

        if (pipes[i].offscreen()) {
          pipes.splice(i, 1)
        }
      }

      for (let i = 0; i < TOTAL_BIRDS; i++) {
        const bird = birds[i]
        if (bird) {
          const birdBrain = birdBrains[i]

          birdBrain.think(pipes)

          for (let j = pipes.length - 1; j >= 0; j--) {
            if (pipes[j].hits(bird)) {
              lastBirdBrain = birdBrains[i].brain.serialize()
              birds.splice(i, 1)
              birdBrains.splice(i, 1)
              // gameOver()
            }
          }

          bird.update()
          bird.show()
        }

        if (birds.filter(bird => bird !== null).length === 0) {
          console.log(lastBirdBrain)

          gameOver()
        }
      }



      pipes.forEach(pipe => {
        if (pipe.getNewPipe) {
          pipes.push(new Pipe(p, pipeBodySprite, pipePeakSprite, PIPES_SPEED, PIPES_GAP))
        }
      })

      showScores()
    }

    function showScores () {
      p.textSize(32)
      p.text('score: ' + score, 1, 32)
      p.text('record: ' + maxScore, 1, 64)
    }

    function gameOver () {
      p.textSize(64)
      p.textAlign(p.CENTER, p.CENTER)
      p.text('GAMEOVER', p.width / 2, p.height / 2)
      p.textSize(35)
      p.text('press SPACE to restart', p.width / 2, p.height / 2 + 42)
      p.textAlign(p.LEFT, p.BASELINE)
      maxScore = p.max(score, maxScore)
      isOver = true
      p.noLoop()
    }

    function reset () {
      isOver = false
      score = 0
      pipes = [new Pipe(p ,pipeBodySprite,pipePeakSprite, PIPES_SPEED, PIPES_GAP)]
      birds = []
      birdBrains = []
      for (let i = 0; i < TOTAL_BIRDS; i++) {
        const bird = new Bird(p.height, p, birdSprites)
        birds.push(bird)
        birdBrains.push(new BirdBrain(p, bird))
      }
      p.loop()
    }
  }

  return (
    <Container className='canvas-container'>
      <Paper className='canvas-paper' elevation={3}>
        <ReactP5Wrapper className='canvas' sketch={sketch}/>
      </Paper>
    </Container>
  )
}

