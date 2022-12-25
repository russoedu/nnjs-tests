import { Container, Paper } from '@mui/material'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
import trainingData from '../data/XOR-training.json'
import { NeuralNetwork } from '../modules/NeuralNetwork'

export function XOR () {
  const nn = new NeuralNetwork(2, 2, 1, 0.01)

  let canvasSize: number
  function sketch (p: P5CanvasInstance) {
    p.setup = () => {
      canvasSize = Math.min(p.windowHeight - 68 - 16 - 20, p.windowWidth - 16 - 16)
      p.createCanvas(canvasSize, canvasSize)
    }

    p.draw = () => {
      p.background(0)

      for (let i = 0; i < 10000; i++) {
        const data = p.random(trainingData)
        nn.train(data.inputs, data.targets)
      }

      const resolution = Math.round(p.width / 50)
      const cols = p.width / resolution
      const rows = p.height / resolution
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x1 = i / cols
          const x2 = j / rows
          const inputs = [x1, x2]

          const y = nn.predict(inputs)[0]
          p.noStroke()

          p.fill(y * 255)
          p.rect(i * resolution, j * resolution, resolution, resolution)
        }
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
