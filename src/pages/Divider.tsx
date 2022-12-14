import { Container, Paper } from '@mui/material'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
import { PerceptronModule } from '../modules/Perceptron'

export function Divider () {
  const training = new Array(5000)
  // A Perceptron object
  let perceptron: PerceptronModule
  // Learning Constant is low just b/c it's fun to watch, this is not necessarily optimal
  const learningRate = 0.001

  // We will train the perceptron with one "Point" object at a time
  let count = 0

  let canvasSize: number
  // Coordinate space
  const xMin = -1
  const yMin = -1
  const xMax = 1
  const yMax = 1

  // The function to describe a line
  function f (x: number) {
    const y = x
    return y
  }

  function sketch (p: P5CanvasInstance) {
    p.setup = () =>{
      canvasSize = Math.min(p.windowHeight - 68 - 16 - 20, p.windowWidth - 16 - 16)
      p.createCanvas(canvasSize, canvasSize)

      /*
       * The perceptron has 3 inputs -- x, y, and bias
       * Second value is "Learning Constant"
       */
      perceptron = new PerceptronModule(3, learningRate)

      // Create a random set of training points and calculate the "known" answer
      for (let i = 0; i < training.length; i++) {
        const x = p.random(xMin, xMax)
        const y = p.random(yMin, yMax)
        let answer = 1
        if (y < f(x)) answer = -1
        training[i] = {
          input:  [x, y, 1],
          output: answer,
        }
      }
    }

    p.draw = () =>{
      p.fill(120, 100, 100)
      p.triangle(0, canvasSize, canvasSize, 0, canvasSize, canvasSize)

      p.fill(100, 120, 100)
      p.triangle(0, canvasSize, canvasSize, 0, 0, 0)

      // Draw the line
      p.strokeWeight(5)
      p.stroke(0, 0, 0)
      let x1 = p.map(xMin, xMin, xMax, 0, p.width)
      let y1 = p.map(f(xMin), yMin, yMax, p.height, 0)
      let x2 = p.map(xMax, xMin, xMax, 0, p.width)
      let y2 = p.map(f(xMax), yMin, yMax, p.height, 0)
      p.line(x1, y1, x2, y2)

      /*
       * Draw the line based on the current weights
       * Formula is weights[0]*x + weights[1]*y + weights[2] = 0
       */
      p.stroke(255, 255, 255)
      p.strokeWeight(1)
      x1 = xMin
      y1 = (-perceptron.weights[2] - perceptron.weights[0] * x1) / perceptron.weights[1]
      x2 = xMax
      y2 = (-perceptron.weights[2] - perceptron.weights[0] * x2) / perceptron.weights[1]

      x1 = p.map(x1, xMin, xMax, 0, p.width)
      y1 = p.map(y1, yMin, yMax, p.height, 0)
      x2 = p.map(x2, xMin, xMax, 0, p.width)
      y2 = p.map(y2, yMin, yMax, p.height, 0)
      p.line(x1, y1, x2, y2)

      // Train the Perceptron with one "training" point at a time
      perceptron.train(training[count].input, training[count].output)
      count = (count + 1) % training.length

      /*
       * Draw all the points based on what the Perceptron would "guess"
       * Does not use the "known" correct answer
       */
      for (let i = 0; i < count; i++) {
        const guess = perceptron.feedforward(training[i].input)
        p.fill(255, 0, 0)
        if (guess > 0) {
          p.stroke(0, 255, 0)
          p.noFill()
        } else {
          p.stroke(255, 0, 0)
        }
        p.strokeWeight(1)

        const x = p.map(training[i].input[0], xMin, xMax, 0, p.width)
        const y = p.map(training[i].input[1], yMin, yMax, p.height, 0)
        p.ellipse(x, y, 4, 4)
      }
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
