import { Button, Container, Paper } from '@mui/material'
import p5 from 'p5'
import random from 'random'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
import { Bird } from '../modules/Bird'
import { BirdBrain } from '../modules/BirdBrain'
import { GeneticAlgorithm } from '../modules/GeneticAlgorithm'
import { Pipe } from '../modules/Pipe'

export function TrainingBird () {
  const TOTAL_BIRDS = 1000
  let PIPES_SPEED = 5
  const PIPES_GAP = 125
  let MUTATION_RATE = 0.5
  const BREAK_DISTANCE = 100000

  let ga: GeneticAlgorithm
  let birds: Bird[] = []
  let birdBrains: BirdBrain[] = []
  let run = 1

  let loopsPerFrameSlider: p5.Element
  let pipes: Pipe[] = []
  let isOver = false
  let record = 0

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
      loopsPerFrameSlider = p.createSlider(1, 1000, 1)

      const saveButton = p.select('#save') as p5.Element
      saveButton.mouseReleased(function () {
        if (ga?.savedBirds) {
          const name = `${ga.savedBirds.fittest.name}-${PIPES_SPEED}-${ga.savedBirds.fittest.bird.distance}.json`
          p.saveJSON(ga.savedBirds.fittest.brain.brain, name)
        }
      })

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
      for (let n = 0; n < (loopsPerFrameSlider.value() as number); n++) {

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

            if (bird.offScreen()) {
              fittest = ga.savedBirds.fittest.name
              birds.splice(i, 1)
              birdBrains.splice(i, 1)
            }
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
        if (birds.length > 100) {
          birds.splice(100, 1)
        }

        if (birds.length === 0 || birds[0].distance >= BREAK_DISTANCE) {
          MUTATION_RATE = Math.min(
            BREAK_DISTANCE / 1000 / Math.max(ga.savedBirds.fittest.bird.distance - 1000, 1),
            0.5,
            MUTATION_RATE + 0.001
          )
          gameOver()
        }


        pipes.forEach(pipe => {
          if (pipe.getNewPipe) {
            pipes.push(new Pipe(p, pipeBodySprite, pipePeakSprite, PIPES_SPEED, PIPES_GAP))
          }
        })
      }

      p.background(0, 80, 255)

      if (loopsPerFrameSlider.value() <= 100) {
        for (const bird of birds) {
          bird.show()
        }
        for (const pipe of pipes) {
          pipe.show()
        }
      }


      updateData()
    }

    function updateData () {
      record = Math.max(record, ga.savedBirds.fittest.bird.distance)
      let position = 7
      p.textAlign(p.RIGHT, p.BOTTOM)
      const textX = p.width - 5
      p.textSize(32)
      p.text('run: ' + run.toLocaleString(), textX, p.height - 32 * position--)
      p.text('speed: ' + PIPES_SPEED.toFixed(2).toLocaleString(), textX, p.height - 32 * position--)
      p.text('mutation rate: ' + MUTATION_RATE.toFixed(3), textX, p.height - 32 * position--)
      p.text('birds: ' + birds.length.toLocaleString(), textX, p.height - 32 * position--)
      p.text('distance: ' + birds[0].distance.toLocaleString(), textX, p.height - 32 * position--)
      p.text('fittest rocket: ' + fittest, textX, p.height - 32 * position--)
      p.text('record: ' + record.toLocaleString(), textX, p.height - 32 * position--)
      p.text('loops per frames: ' + loopsPerFrameSlider.value().toLocaleString(), textX, p.height - 32 * position--)
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
      PIPES_SPEED = Number(random.float(3, 5).toFixed(2))
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
        <Button id="save">save smartest</Button>
      </Paper>
    </Container>
  )
}

