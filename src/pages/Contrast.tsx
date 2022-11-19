import random from 'random'
import p5 from 'p5'
import { Container, Paper } from '@mui/material'
import Sketch from 'react-p5'
import { NeuralNetwork } from '../modules/NeuralNetwork'
import fontColorContrast from 'font-color-contrast'

enum Colour {
  BLACK = 0,
  WHITE = 255,
}
enum Status {
  START,
  TRAIN,
  VIEW,
}
export function Contrast () {
  let canvasSize: number
  let colour = [0, 0, 0]
  let status = Status.START

  let brain: NeuralNetwork
  let trainIteration = 0

  let fontColorContrastColour = Colour.WHITE
  let predictionColour = Colour.WHITE

  function setNewColour () {
    colour = [
      random.int(255),
      random.int(255),
      random.int(255),
    ]
  }

  function mouseClicked (p: p5) {
    switch (status) {
    case Status.START:
      status = Status.TRAIN
      break
    case Status.TRAIN:
      p.noLoop()
      status = Status.VIEW
      break
    case Status.VIEW:
      setNewColour()
      p.redraw()
      break
    }
  }

  function restartTraining (p: p5) {
    status = Status.START
    p.loop()
  }

  function setColours () {
    const normalisedColour = colour.map(c => c / 255)
    const contrastHex = fontColorContrast(colour)
    fontColorContrastColour = contrastHex === '#000000' ? Colour.BLACK : Colour.WHITE

    let prediction = [0, 0]
    if (status === Status.TRAIN) {
      setNewColour()
      const trainContrast = fontColorContrastColour === Colour.BLACK ? [1, 0] : [0, 1]
      prediction = brain.train(normalisedColour, trainContrast)
    } else {
      prediction = brain.predict(normalisedColour)
    }
    console.log('prediction', prediction)

    predictionColour = prediction[0] > prediction[1] ? Colour.BLACK : Colour.WHITE
  }

  function setup (p: p5, canvasParentRef: Element) {
    canvasSize = Math.min(p.windowHeight - 68 - 16 - 20, p.windowWidth - 16 - 16)
    p.createCanvas(canvasSize, canvasSize / 2).parent(canvasParentRef)

    brain = new NeuralNetwork(3, 3, 2)

    status = Status.START
    p.loop()
  }

  function draw (p: p5) {
    setColours()

    p.background(colour[0], colour[1], colour[2])
    p.textSize(64)
    p.textAlign(p.CENTER, p.CENTER)

    p.fill(0)
    p.text('black', canvasSize / 3, p.height / 4)

    p.fill(255)
    p.text('white', 2 * canvasSize / 3, p.height / 4)

    p.fill(predictionColour)
    p.text('prediction', canvasSize / 2, 3 * p.height / 4)

    p.fill(fontColorContrastColour)
    p.text('fontColorContrast', canvasSize / 2, 2 * p.height / 4)

    p.fill(0)
    p.textAlign(p.RIGHT, p.CENTER)
    p.textFont('monospace', 20)
    const rectSize = p.textWidth(String(trainIteration)) + 20
    p.rect(p.width - rectSize, 0, rectSize, 30)

    p.fill(255)
    p.text(trainIteration, p.width - 10, 17)

    if (status === Status.TRAIN) {
      trainIteration++
    }
  }



  return (
    <Container className='canvas-container'>
      <Paper className='canvas-paper' elevation={3}>
        <Sketch className='canvas' setup={setup as any} draw={draw as any} mouseClicked={mouseClicked as any} mouseDragged={restartTraining as any}/>
      </Paper>
    </Container>
  )
}
