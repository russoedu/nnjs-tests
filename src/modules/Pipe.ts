import p5 from 'p5'
import { P5CanvasInstance } from 'react-p5-wrapper'
import { Bird } from './Bird'

export class Pipe {
  spacing: number
  top: number
  bottom: number
  x: number
  w: number
  speed: number
  passed: boolean
  highlight: boolean
  pipeBodySprite: p5.Image
  pipePeakSprite: p5.Image
  p5: P5CanvasInstance

  constructor (pipeBodySprite: p5.Image, pipePeakSprite: p5.Image, p5: P5CanvasInstance) {
    this.spacing = 180
    this.top = p5.random(p5.height / 6, 3 / 4 * p5.height)
    this.bottom = this.top + this.spacing

    this.x = p5.width
    this.w = 80
    this.speed = 3

    this.passed = false
    this.highlight = false

    this.pipeBodySprite = pipeBodySprite
    this.pipePeakSprite = pipePeakSprite

    this.p5 = p5
  }

  hits (bird: Bird) {
    const halfBirdHeight = bird.height / 2
    const halfBirdWidth = bird.width / 2
    if (bird.y - halfBirdHeight < this.top || bird.y + halfBirdHeight > this.bottom) {
      //if this.w is huge, then we need different collision model
      if (bird.x + halfBirdWidth > this.x && bird.x - halfBirdWidth < this.x + this.w) {
        this.highlight = true
        this.passed = true
        return true
      }
    }
    this.highlight = false
    return false
  }

  //this function is used to calculate scores and checks if we've went through the pipes
  pass (bird: Bird) {
    if (bird.x > this.x && !this.passed) {
      this.passed = true
      return true
    }
    return false
  }

  drawHalf () {
    let howManyNeeded = 0
    const peakRatio = this.pipePeakSprite.height / this.pipePeakSprite.width
    const bodyRatio = this.pipeBodySprite.height / this.pipeBodySprite.width
    //this way we calculate, how many tubes we can fit without stretching
    howManyNeeded = Math.round(this.p5.height / (this.w * bodyRatio))
    //this <= and start from 1 is just my HACK xD But it's working
    for (let i = 0; i < howManyNeeded; ++i) {
      const offset = this.w * (i * bodyRatio + peakRatio)
      this.p5.image(this.pipeBodySprite, -this.w / 2, offset, this.w, this.w * bodyRatio)
    }
    this.p5.image(this.pipePeakSprite, -this.w / 2, 0, this.w, this.w * peakRatio)
  }

  show () {
    this.p5.push()
    this.p5.translate(this.x + this.w / 2, this.bottom)
    this.drawHalf()
    this.p5.translate(0, -this.spacing)
    this.p5.rotate(this.p5.PI)
    this.drawHalf()
    this.p5.pop()
  }

  update () {
    this.x -= this.speed
  }

  offscreen () {
    return (this.x < -this.w)
  }
}
