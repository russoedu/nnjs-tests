import random from 'random'
import { ReactP5Wrapper, P5CanvasInstance } from 'react-p5-wrapper'
import { Container, Paper } from '@mui/material'
import { NeuralNetwork } from '../modules/NeuralNetwork'
import fontColorContrast from 'font-color-contrast'

const meaning = 'Contrast is the contradiction in luminance or colour that makes an object (or its representation in an image or display) distinguishable. In visual perception of the real world, contrast is determined by the difference in the colour and brightness of the object and other objects within the same field of view. The human visual system is more sensitive to contrast than absolute luminance; we can perceive the world similarly regardless of the huge changes in illumination over the day or from place to place. The maximum contrast of an image is the contrast ratio or dynamic range. Images with a contrast ratio close to their medium\'s maximum possible contrast ratio experience a conservation of contrast, wherein any increase in contrast in some parts of the image must necessarily result in a decrease in contrast elsewhere. Brightening an image will increase contrast in dark areas but decrease contrast in bright areas, while darkening the image will have the opposite effect. Bleach bypass destroys contrast in both the darkest and brightest parts of an image while enhancing luminance contrast in areas of intermediate brightness.'

const meaningFontSize = 10

enum Colour {
  BLACK = 0,
  WHITE = 255,
}
enum Status {
  START,
  TRAIN,
  VIEW,
}
export function ColourContrast () {
  let canvasSize: number
  let r = 0
  let g = 0
  let b = 0

  let status = Status.START

  let brain: NeuralNetwork
  let trainIteration = 0
  let trainError = ''

  let fontColorContrastColour = Colour.WHITE
  let predictionColour = Colour.WHITE

  function setNewColour () {
    r = random.int(255)
    g = random.int(255)
    b = random.int(255)
  }

  function getNormalisedColour (colour: number) {
    return colour / 255
  }



  function setColours () {
    const normalisedColour = [
      getNormalisedColour(r),
      getNormalisedColour(g),
      getNormalisedColour(b),
    ]

    const contrastHex = fontColorContrast(g, g, b)
    fontColorContrastColour = contrastHex === '#000000' ? Colour.BLACK : Colour.WHITE

    let prediction = [0, 0]
    const trainContrast = fontColorContrastColour === Colour.BLACK ? [1, 0] : [0, 1]
    if (status === Status.TRAIN) {
      setNewColour()
      prediction = brain.train(normalisedColour, trainContrast)
    } else {
      prediction = brain.predict(normalisedColour)
    }

    console.log('prediction', prediction)
    const e = (fontColorContrastColour === Colour.BLACK
      ? (trainContrast[0] - prediction[0]) / (prediction[0] + trainContrast[0])
      : (trainContrast[1] - prediction[1]) / (prediction[1] + trainContrast[1])
      * 100).toFixed(2)
    trainError = ' '.repeat(6 - e.length) + e + '%'
    console.log('error', trainError)

    predictionColour = prediction[0] > prediction[1] ? Colour.BLACK : Colour.WHITE
  }
  function sketch (p: P5CanvasInstance) {
    p.setup = () => {
      canvasSize = Math.min(p.windowHeight - 68 - 16 - 20, p.windowWidth - 16 - 16)
      p.createCanvas(canvasSize, canvasSize)

      brain = new NeuralNetwork(3, 3, 2)

      status = Status.START
      p.loop()
    }

    p.draw = () => {
      setColours()
      const textHeight = meaning.length * meaningFontSize * p.textDescent() / p.width


      p.background(r, g, b)
      p.textSize(10)
      p.textAlign(p.LEFT, p.TOP)

      p.fill(0)
      p.text(meaning, 20, 20, p.width - 20)

      p.fill(255)
      p.text(meaning, 20, textHeight + 20, p.width - 20)

      p.textAlign(p.CENTER, p.CENTER)
      p.textSize(64)

      p.fill(predictionColour)
      p.text('prediction', canvasSize / 2, 3 * p.height / 4)

      p.fill(fontColorContrastColour)
      p.text('fontColorContrast', canvasSize / 2, 2 * p.height / 4)

      p.textAlign(p.RIGHT, p.CENTER)
      p.textFont('monospace', 20)

      const trainRectSize = p.textWidth(`Iteration: ${trainIteration}`) + 20
      p.fill(0)
      p.rect(p.width - trainRectSize, 0, trainRectSize, 30)
      p.fill(255)
      p.text(`Iteration: ${trainIteration}`, p.width - 10, 17)

      const errorRectSize = p.textWidth(`Error: ${trainError}`) + 20
      p.fill(0)
      p.rect(p.width - errorRectSize, p.height - 30, errorRectSize, 30)
      p.fill(255)
      p.text(`Error: ${trainError}`, p.width - 10, p.height - 13)

      if (status === Status.TRAIN) {
        trainIteration++
      }
    }

    p.mouseClicked = () => {
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

    p.mouseDragged = () => {
      status = Status.START
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
