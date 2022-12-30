import { Container, Paper } from '@mui/material'
import p5 from 'p5'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
import { Bird } from '../modules/Bird'
import { BirdBrain } from '../modules/BirdBrain'
import { GeneticAlgorithm } from '../modules/GeneticAlgorithm'
import { Pipe } from '../modules/Pipe'
import hash from 'hash-it'

export function TrainingBird () {
  const TOTAL_BIRDS = 500
  const PIPES_SPEED = 4 // 4 or less or not possible with this gravity
  const PIPES_GAP = 150
  let MUTATION_RATE = 0.5 // Decreases by MUTATION_RATE_RATE each iteration
  const MUTATION_RATE_RATE = 0.001

  let ga: GeneticAlgorithm
  let birds: Bird[] = []
  let birdBrains: BirdBrain[] = []

  let lastBirdBrain: string|undefined

  let pipes: Pipe[] = []
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
      ga = new GeneticAlgorithm(p, TOTAL_BIRDS, birdSprites)
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

      for (let i = 0; i < birds.length; i++) {
        const bird = birds[i]
        if (bird) {
          const birdBrain = birdBrains[i]

          birdBrain.think(pipes)

          if (birds.length === 1) {
            lastBirdBrain = birdBrains[0].brain.serialize()
          }

          for (let j = pipes.length - 1; j >= 0; j--) {
            if (pipes[j].hits(bird)) {
              birds.splice(i, 1)
              birdBrains.splice(i, 1)
              // gameOver()
            }
          }

          bird.update()
          bird.show()
        }

      }

      if (birds.length === 0) {
        gameOver()
      }

      pipes.forEach(pipe => {
        if (pipe.getNewPipe) {
          pipes.push(new Pipe(p, pipeBodySprite, pipePeakSprite, PIPES_SPEED, PIPES_GAP))
        }
      })

      showBirds()
    }

    function showBirds () {
      p.textSize(32)
      p.text('birds: ' + birds.length, 1, 32 * 1)
      p.text('mutation rate: ' + MUTATION_RATE, 1, 32 * 2)
      p.text('bird hash: ' + hash(lastBirdBrain), 1, 32 * 3)
    }

    function gameOver () {
      p.textSize(64)
      p.textAlign(p.CENTER, p.CENTER)
      p.text('GAMEOVER', p.width / 2, p.height / 2)
      p.textSize(35)
      p.text('press SPACE to restart or wait', p.width / 2, p.height / 2 + 42)
      p.textAlign(p.LEFT, p.BASELINE)
      isOver = true

      reset()
    }

    function reset () {
      isOver = false
      pipes = [new Pipe(p ,pipeBodySprite,pipePeakSprite, PIPES_SPEED, PIPES_GAP)]

      ga.nextGeneration(MUTATION_RATE, lastBirdBrain)
      MUTATION_RATE = MUTATION_RATE <= MUTATION_RATE_RATE
        ? MUTATION_RATE_RATE
        : MUTATION_RATE - MUTATION_RATE_RATE

      birds = ga.birds
      birdBrains = ga.birdBrains
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

