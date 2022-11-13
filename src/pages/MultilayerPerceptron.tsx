import { Container, Paper } from '@mui/material'
import p5 from 'p5'
import Sketch from 'react-p5'
import './Perceptron.css'

export function MultilayerPerceptron () {
  // See annotations in JS for more information
  function setup (p: p5, canvasParentRef: Element) {

  }

  function draw (p: p5) {

  }
  return (
    <Container className='container'>
      <Paper elevation={3}>
      <Sketch className='multilayer-perceptron' setup={setup as any} draw={draw as any} />
    </Paper>
    </Container>
  )
}
