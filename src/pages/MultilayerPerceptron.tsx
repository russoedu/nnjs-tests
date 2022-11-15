import { Container, Paper } from '@mui/material'
import p5 from 'p5'
import Sketch from 'react-p5'
import { Matrix } from '../modules/Matrix'
import './Perceptron.css'

export function MultilayerPerceptron () {
  const m1 = new Matrix(2, 3)
  const m2 = new Matrix(2, 3)
  m1.randomize()
  m2.randomize()
  m1.print()
  m2.print()
  m1.add(2)
  m2.multiply(2)
  m1.print()
  m2.print()
  m1.multiply(m2)
  m1.print()

  const x = JSON.parse(JSON.stringify(m1.data))
  console.log(x[0] === m1.data[0])

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
