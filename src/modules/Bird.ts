import p5 from 'p5'
import { P5CanvasInstance } from 'react-p5-wrapper'

export class Bird {
  y: number
  x: number
  gravity: number
  lift: number
  velocity: number
  icon: p5.Image
  width: number
  height: number
  p5: P5CanvasInstance

  constructor (height: number, p5: P5CanvasInstance, birdSprite: p5.Image) {
    this.y = height / 2
    this.x = 64

    this.gravity = 0.6
    this.lift = -10
    this.velocity = 0

    this.icon = birdSprite
    this.width = 70
    this.height = 40

    this.p5 = p5
  }

  show () {
    // draw the icon CENTRED around the X and Y coords of the bird object
    this.p5.image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
  }

  up () {
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
