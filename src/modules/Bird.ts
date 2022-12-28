import p5 from 'p5'
import { P5CanvasInstance } from 'react-p5-wrapper'

export class Bird {
  y: number
  x: number
  gravity: number
  lift: number
  velocity: number
  sprites: p5.Image[]
  width: number
  height: number
  p5: P5CanvasInstance
  frame = 1
  frameCounter = 0

  constructor (height: number, p5: P5CanvasInstance, birdSprites: p5.Image[]) {
    this.y = height / 2
    this.x = 64

    this.gravity = 0.6
    this.lift = -10
    this.velocity = 0

    this.sprites = birdSprites
    this.width = 70
    this.height = 25

    this.p5 = p5
  }

  show () {
    this.frameCounter = this.frameCounter === 20 ? 0 : this.frameCounter + 1
    // draw the icon CENTRED around the X and Y coords of the bird object
    this.frame = this.frameCounter < 10 ? 0 : 1
    this.p5.image(this.sprites[this.frame], this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
  }

  flyUp () {
    this.velocity = this.lift
  }

  update () {
    this.velocity += this.gravity
    this.y += this.velocity

    if (this.y >= this.p5.height - this.height / 2) {
      this.y = this.p5.height - this.height / 2
      this.velocity = 0
    }

    if (this.y <= this.height / 2) {
      this.y = this.height / 2
      this.velocity = 0
    }
  }
}
