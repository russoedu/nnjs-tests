import { Container, Paper } from '@mui/material'
import p5 from 'p5'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
import { Bird } from '../modules/Bird'
import { BirdBrain } from '../modules/BirdBrain'
import { NeuralNetwork } from '../modules/NeuralNetwork'
import { Pipe } from '../modules/Pipe'
import { smartestKnownBird } from '../modules/types'


export function SmartyBird () {
  const PARALLAX = 0.1
  const PIPES_SPEED = 3.51
  const PIPES_GAP = 125

  let bird: Bird
  let birdBrain: BirdBrain

  let pipes: Pipe[] = []
  let score = 0
  let maxScore = 0
  let bgX = 0
  let isOver = false

  let pipeBodySprite: p5.Image
  let pipePeakSprite: p5.Image
  let birdSprites: p5.Image[]
  let bgImg: p5.Image


  function sketch (p: P5CanvasInstance) {
    p.preload = () => {
      pipeBodySprite = p.loadImage('flappy-bird/pipe.svg')
      pipePeakSprite = p.loadImage('flappy-bird/pipe.svg')
      birdSprites = [
        p.loadImage('flappy-bird/rocket-frame-0.svg'),
        p.loadImage('flappy-bird/rocket-frame-1.svg'),
      ]
      bgImg = p.loadImage('flappy-bird/background.png')
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
      p.background(0)
      birdBrain.think(pipes)
      // Draw our background image, then move it at the same speed as the pipes
      p.image(bgImg, bgX, 0, bgImg.width, p.height)
      bgX -= pipes[0].speed * PARALLAX

      /*
       * this handles the "infinite loop" by checking if the right
       * edge of the image would be on the screen, if it is draw a
       * second copy of the image right next to it
       * once the second image gets to the 0 point, we can reset bgX to
       * 0 and go back to drawing just one image.
       */
      if (bgX <= -bgImg.width + p.width) {
        p.image(bgImg, bgX + bgImg.width, 0, bgImg.width, p.height)
        if (bgX <= -bgImg.width) {
          bgX = 0
        }
      }

      for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update()
        pipes[i].show()

        if (pipes[i].pass(bird)) {
          score++
        }

        if (pipes[i].hits(bird)) {
          gameOver()
        }

        if (pipes[i].offscreen()) {
          pipes.splice(i, 1)
        }
      }

      bird.update()
      bird.show()

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
      bgX = 0
      pipes = [new Pipe(p, pipeBodySprite, pipePeakSprite, PIPES_SPEED, PIPES_GAP)]
      bird = new Bird(p, birdSprites)
      const brain = NeuralNetwork.deserialize(smartestKnownBird)
      birdBrain = new BirdBrain(p, bird, brain)

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
