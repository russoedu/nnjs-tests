import random from 'random'
import p5 from 'p5'
import { Container, Paper } from '@mui/material'
import Sketch from 'react-p5'
import { NeuralNetwork } from '../modules/NeuralNetwork'
import fontColorContrast from 'font-color-contrast'

enum Colour {
  BLACK = 'black',
  WHITE = 'white',
}
enum Train {
  NONE,
  TRAINING_START,
  TRAINING,
  JUST_TRAINED,
  TRAINED,
}
export function Contrast () {
  let canvasSize: number
  let colour = [0, 0, 0]
  let brain: NeuralNetwork
  let contrast = Colour.WHITE
  let prediction = Colour.WHITE
  let trained = Train.NONE
  let trainIteration = 0

  function pickColour () {
    colour = [
      random.int(255),
      random.int(255),
      random.int(255),
    ]
  }

  function mouseClicked (p: p5) {
    if (trained >= Train.JUST_TRAINED) {
      p.noLoop()
      pickColour()
      p.redraw()
    } else if (trained === Train.NONE) {
      trained = Train.TRAINING_START
    } else {
      trained = Train.JUST_TRAINED
      p.noLoop()
    }
  }

  function mouseDragged (p: p5) {
    trained = Train.NONE
    p.loop()
  }

  function colourContrast () {
    const contrast = fontColorContrast(colour) === '#000000' ? Colour.BLACK : Colour.WHITE
    console.log('colour', colour)
    console.log('fontColorContrast', contrast === Colour.BLACK ? [1, 0] : [0, 1])

    return contrast
  }

  function getPredictionColour (prediction: number[]) {
    return prediction[0] > prediction[1] ? Colour.BLACK : Colour.WHITE
  }

  function colourPrediction () {
    const brainResponse = brain.predict(colour.map(c => c / 255))
    console.log('prediction', brainResponse)

    return getPredictionColour(brainResponse)
  }

  function setup (p: p5, canvasParentRef: Element) {

    canvasSize = Math.min(p.windowHeight - 68 - 16 - 20, p.windowWidth - 16 - 16)
    p.createCanvas(canvasSize, canvasSize).parent(canvasParentRef)

    brain = new NeuralNetwork(3, 3, 2)

    trained = Train.NONE
  }

  function draw (p: p5) {
    if (trained < Train.JUST_TRAINED) {
      if (trained === Train.TRAINING_START) {
        console.log('Training')
        trained = Train.TRAINING
      }

      pickColour()

      const trainContrast = fontColorContrast(colour) === '#000000' ? [1, 0] : [0, 1]
      const trainResponse = brain.train(colour.map(c => c / 255), trainContrast)
      prediction = getPredictionColour(trainResponse)

      p.background(colour[0], colour[1], colour[2])
      p.textSize(64)
      p.textAlign(p.CENTER, p.CENTER)

      p.fill(0)
      p.text('black', canvasSize / 3, canvasSize / 4)

      p.fill(255)
      p.text('white', 2 * canvasSize / 3, canvasSize / 4)

      contrast = colourContrast()
      if (contrast === Colour.BLACK) {
        p.fill(0)
      } else {
        p.fill(255)
      }
      p.text('fontColorContrast', canvasSize / 2, 2 * canvasSize / 4)

      prediction = colourPrediction()
      if (prediction === Colour.BLACK) {
        p.fill(0)
      } else {
        p.fill(255)
      }
      p.text('prediction', canvasSize / 2, 3 * canvasSize / 4)

      trainIteration++
      if (trainIteration > 100000) {
        trained = Train.JUST_TRAINED
        p.noLoop()
      } else {
        if (contrast === Colour.BLACK) {
          p.fill(0)
        } else {
          p.fill(255)
        }
        p.textAlign(p.RIGHT, p.TOP)
        p.textSize(25)
        p.text(trainIteration, canvasSize - 10, 10)
      }
    } else {

      p.background(colour[0], colour[1], colour[2])
      p.textSize(64)
      p.textAlign(p.CENTER, p.CENTER)

      p.fill(0)
      p.text('black', canvasSize / 3, canvasSize / 4)

      p.fill(255)
      p.text('white', 2 * canvasSize / 3, canvasSize / 4)

      contrast = colourContrast()
      if (contrast === Colour.BLACK) {
        p.fill(0)
      } else {
        p.fill(255)
      }
      p.text('fontColorContrast', canvasSize / 2, 2 * canvasSize / 4)

      prediction = colourPrediction()
      if (prediction === Colour.BLACK) {
        p.fill(0)
      } else {
        p.fill(255)
      }
      p.text('prediction', canvasSize / 2, 3 * canvasSize / 4)
    }
  }



  return (
    <Container className='canvas-container'>
      <Paper className='canvas-paper' elevation={3}>
        <Sketch className='canvas' setup={setup as any} draw={draw as any} mouseClicked={mouseClicked as any} mouseDragged={mouseDragged as any}/>
      </Paper>
    </Container>
  )
}
