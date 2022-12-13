import { Button, Container, Paper } from '@mui/material'
import p5 from 'p5'
import { useState } from 'react'
import Sketch from 'react-p5'
import { prepare, testAll, trainEpoch } from '../modules/Doodle'
import { NeuralNetwork } from '../modules/NeuralNetwork'
import { Bytes, CategoryEntry, Result } from '../modules/types'

const width = 28
const height = width
const size = width * height

let catsData: Bytes
let trainsData: Bytes
let rainbowsData: Bytes

let epochCounter = 0

export function DoodleClassifier () {
  let training: CategoryEntry[] = []
  let testing: CategoryEntry[] = []
  let nn: NeuralNetwork = {} as any
  const [status, setStatus] = useState('')

  // See annotations in JS for more information
  function preload (p: p5) {
    catsData = p.loadBytes('doodles/cats1000.bin') as Bytes
    rainbowsData = p.loadBytes('doodles/rainbows1000.bin') as Bytes
    trainsData = p.loadBytes('doodles/trains1000.bin') as Bytes
  }

  function setup (p: p5, canvasParentRef: Element) {
    p.createCanvas(280, 280).parent(canvasParentRef)
    p.background(255)

    const testButton = p.select('#test') as p5.Element
    const guessButton = p.select('#guess') as p5.Element
    const clearButton = p.select('#clear') as p5.Element
    const trainButton = p.select('#train') as p5.Element

    nn = new NeuralNetwork(size, 64, 3)

    trainButton.mousePressed(function () {
      const result = prepare(p, catsData, rainbowsData, trainsData, size)
      training = result.training
      testing = result.testing

      trainEpoch(nn, training, epochCounter)
      epochCounter++
      console.log('Epoch: ' + epochCounter)
      setStatus(`Trained Epoch #${epochCounter}`)
    })

    testButton.mousePressed(function () {
      const percent = testAll(nn, testing, epochCounter)
      console.log(`% correct = ${p.nf(percent, 2, 2)}%`)
      setStatus(`Tested with ${p.nf(percent, 2, 2)}% correct`)
    })

    guessButton.mousePressed(function () {
      const inputs = []
      const img = p.get()
      img.resize(28, 28)
      img.loadPixels()

      for (let i = 0; i < size; i++) {
        const bright = img.pixels[i * 4]
        inputs[i] = (255 - bright) / 255.0
      }

      console.log(inputs)

      const guess = nn.predict(inputs)
      // console.log(guess);
      const m = p.max(guess)
      const classification = guess.indexOf(m)
      setStatus(Result[classification])
    })

    clearButton.mousePressed(function () {
      p.background(255)
    })
  }
  function draw (p: p5) {// _p: p5) {
    p.strokeWeight(8)
    p.stroke(0)
    if (p.mouseIsPressed) {
      p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY)
    }
  }
  return (
    <Container className='canvas-container'>
      <Paper className='canvas-paper' elevation={3}>
        <h1>Cat, Rainbow or Train?</h1>
        <Sketch className='canvas' preload={preload as any} setup={setup as any} draw={draw as any} />
        <Button id="train">train</Button>
        <Button id="test">test</Button>
        <Button id="guess">guess</Button>
        <Button id="clear">clear</Button>
        <p>{status}</p>
      </Paper>
    </Container>
  )
}
