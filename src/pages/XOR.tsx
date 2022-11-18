import { Container, Paper } from '@mui/material'
import p5 from 'p5'
import Sketch from 'react-p5'
import { NeuralNetwork } from '../modules/NeuralNetwork'
import trainingData from './XOR-training.json'

export function XOR () {
  const nn = new NeuralNetwork(2, 2, 1, 0.01)

  let canvasSize: number
  function setup (p: p5, canvasParentRef: Element) {
    canvasSize = Math.min(p.windowHeight - 68 - 16 - 20, p.windowWidth - 16 - 16)
    p.createCanvas(canvasSize, canvasSize).parent(canvasParentRef)
  }

  function draw (p: p5) {
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

  return (
    <Container className='canvas-container'>
      <Paper className='canvas-paper' elevation={3}>
        <Sketch className='canvas' setup={setup as any} draw={draw as any} />
      </Paper>
    </Container>
  )
}
