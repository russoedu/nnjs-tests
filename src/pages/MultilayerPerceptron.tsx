import { Container, Paper } from '@mui/material'
import p5 from 'p5'
import Sketch from 'react-p5'
import { NeuralNetwork } from '../modules/NeuralNetwork'

export function MultilayerPerceptron () {
  const nn = NeuralNetwork.deserialize({
    inputNodes:  2,
    hiddenNodes: 2,
    outputNodes: 2,
    weightsIH:   {
      rows: 2,
      cols: 2,
      data: [
        [
          -0.8302655275234734,
          1.3709560680332107,
        ],
        [
          0.6390669270701912,
          0.2150643404509951,
        ],
      ],
    },
    weightsHO: {
      rows: 2,
      cols: 2,
      data: [
        [
          0.6539900470290729,
          0.9249435572126452,
        ],
        [
          1.0092518954707632,
          -0.6133956241558756,
        ],
      ],
    },
    biasH: {
      rows: 2,
      cols: 1,
      data: [
        [
          1.9893889863516376,
        ],
        [
          -0.2977108153988719,
        ],
      ],
    },
    biasO: {
      rows: 2,
      cols: 1,
      data: [
        [
          0.35721768691944544,
        ],
        [
          -0.518299801524555,
        ],
      ],
    },
    learningRate:       0.1,
    activationFunction: {
    },
  })
  const input = [1, 0]
  const target = [1, 0]

  console.table(nn.predict(input))
  for (let i = 0; i < 100000; i++) {
    nn.train(input, target)
  }
  console.table(nn.predict(input))

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
