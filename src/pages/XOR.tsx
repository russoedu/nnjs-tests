import { Container, Paper } from '@mui/material'
import p5 from 'p5'
import Sketch from 'react-p5'
import { NeuralNetwork } from '../modules/NeuralNetwork'
import { random } from '../modules/random'

export function XOR () {
  const nn = new NeuralNetwork(2, 3, 1)
  const trainingData = [
    {
      i: [0, 1],
      t: [1],
    },
    {
      i: [1, 0],
      t: [1],
    },
    {
      i: [1, 1],
      t: [0],
    },
    {
      i: [0, 0],
      t: [0],
    },
  ]

  for (let i = 0; i < 100000; i++) {
    const selector = Math.floor(random(0, 3))
    const d = trainingData[selector]
    nn.train(d.i, d.t)
  }

  console.log(nn.predict([0, 1])[0])
  console.log(nn.predict([1, 0])[0])
  console.log(nn.predict([0, 0])[0])
  console.log(nn.predict([1, 1])[0])

  let canvasSize: number
  function setup (p: p5, canvasParentRef: Element) {
    canvasSize = Math.min(p.windowHeight - 68 - 16 - 20, p.windowWidth - 16 - 16)
    p.createCanvas(canvasSize, canvasSize).parent(canvasParentRef)
  }

  function draw (p: p5) {
    p.fill(120, 100, 100)
  }

  return (
    <Container className='container'>
      <Paper elevation={3}>
        <Sketch className='multilayer-perceptron' setup={setup as any} draw={draw as any} />
      </Paper>
    </Container>
  )
}
