/* eslint-disable @typescript-eslint/no-non-null-assertion */
import P5 from 'p5'
import './style.css'

const _app = new P5(p5Instance => {
  const p = p5Instance as unknown as P5

  const x = 100
  const y = 100

  p.setup = function setup () {
    p.createCanvas(500, 500)
  }

  p.draw = function draw () {
    p.background(0)
    p.fill(205)
    p.rect(x, y, 50, 50)
  }
}, document.getElementById('app')!)
