import { Container, Paper } from '@mui/material'
import p5 from 'p5'
import random from 'random'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
import { Bird } from '../modules/Bird'
import { BirdBrain } from '../modules/BirdBrain'
import { GeneticAlgorithm } from '../modules/GeneticAlgorithm'
import { Pipe } from '../modules/Pipe'

export function TrainingBird () {
  const TOTAL_BIRDS = 1000
  let PIPES_SPEED = 5 // 4 or less or not possible with this gravity
  const PIPES_GAP = 150
  let MUTATION_RATE = 0.5
  const BREAK_DISTANCE = 5000

  let ga: GeneticAlgorithm
  let birds: Bird[] = []
  let birdBrains: BirdBrain[] = []
  let run = 1

  let pipes: Pipe[] = []
  let isOver = false

  let fittest = ''

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

        if (pipes[i].offscreen()) {
          pipes.splice(i, 1)
        }
      }

      for (let i = 0; i < birds.length; i++) {
        const bird = birds[i]
        if (bird) {
          const birdBrain = birdBrains[i]

          birdBrain.think(pipes)

          for (let j = pipes.length - 1; j >= 0; j--) {
            if (pipes[j].hits(bird)) {
              fittest = ga.savedBirds.fittest.name
              birds.splice(i, 1)
              birdBrains.splice(i, 1)
            }
          }

          bird.update()
        }
      }

      if (birds.length === 0 || birds[0].distance >= BREAK_DISTANCE) {
        MUTATION_RATE = Math.min(BREAK_DISTANCE / 100 / ga.savedBirds.fittest.bird.distance, 0.5, MUTATION_RATE)
        gameOver()
      }


      pipes.forEach(pipe => {
        if (pipe.getNewPipe) {
          pipes.push(new Pipe(p, pipeBodySprite, pipePeakSprite, PIPES_SPEED, PIPES_GAP))
        }
      })

      for (const bird of birds) {
        bird.show()
      }

      for (const pipe of pipes) {
        pipe.show()
      }

      showData()
    }

    function showData () {
      p.textAlign(p.RIGHT, p.BOTTOM)
      const textX = p.width - 5
      p.textSize(32)
      p.text('birds: ' + birds.length, textX, p.height - 32 * 5)
      p.text('run: ' + run, textX, p.height - 32 * 4)
      p.text('speed: ' + PIPES_SPEED.toFixed(2), textX, p.height - 32 * 3)
      p.text('fittest bird: ' + fittest, textX, p.height - 32 * 2)
      p.text('mutation rate: ' + MUTATION_RATE.toFixed(2), textX, p.height - 32 * 1)
      p.text('distance: ' + birds[0].distance, textX, p.height - 32 * 0)
    }

    function gameOver () {
      p.textSize(64)
      p.textAlign(p.CENTER, p.CENTER)
      p.text('GAMEOVER', p.width / 2, p.height / 2)
      p.textSize(35)
      p.text('press SPACE to restart or wait', p.width / 2, p.height / 2 + 42)
      p.textAlign(p.LEFT, p.BASELINE)
      isOver = true

      run++
      reset()
    }

    function reset () {
      isOver = false
      PIPES_SPEED = Number(random.float(3, 6).toFixed(2))
      pipes = [new Pipe(p ,pipeBodySprite,pipePeakSprite, PIPES_SPEED, PIPES_GAP)]

      ga.nextGeneration(MUTATION_RATE)

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

