import p5 from 'p5'
import { P5CanvasInstance } from 'react-p5-wrapper'
import { Bird } from './Bird'

export class Pipe {
  #gap: number
  #top: number
  #bottom: number
  #x: number
  #y: number
  speed: number
  passed: boolean
  highlight: boolean
  pipeBodySprite: p5.Image
  pipePeakSprite: p5.Image
  p5: P5CanvasInstance
  halfScreen = false
  confirmedHalfScreen = false

  constructor (canvas: P5CanvasInstance, pipeBodySprite: p5.Image, pipePeakSprite: p5.Image , speed = 3, gap = 180) {
    this.#gap = gap
    this.#top = p5.prototype.random(canvas.height / 6, 3 / 4 * canvas.height)
    this.#bottom = this.#top + this.#gap

    this.#x = canvas.width
    this.#y = 80
    this.speed = speed

    this.passed = false
    this.highlight = false

    this.pipeBodySprite = pipeBodySprite
    this.pipePeakSprite = pipePeakSprite

    this.p5 = canvas
  }

  hits (bird: Bird) {
    const halfBirdHeight = bird.height / 2
    const halfBirdWidth = bird.width / 2
    if (bird.y - halfBirdHeight < this.#top || bird.y + halfBirdHeight > this.#bottom) {
      //if this.w is huge, then we need different collision model
      if (bird.x + halfBirdWidth > this.#x && bird.x - halfBirdWidth < this.#x + this.#y) {
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
    if (bird.x > this.#x && !this.passed) {
      this.passed = true
      return true
    }
    return false
  }
  get getNewPipe () {
    if (this.#x < this.p5.width * 0.5) {
      this.halfScreen = true
    }
    if (this.halfScreen && !this.confirmedHalfScreen) {
      this.confirmedHalfScreen = true
      return true
    } else {
      return false
    }
  }

  drawHalf () {
    let howManyNeeded = 0
    const peakRatio = this.pipePeakSprite.height / this.pipePeakSprite.width
    const bodyRatio = this.pipeBodySprite.height / this.pipeBodySprite.width
    //this way we calculate, how many tubes we can fit without stretching
    howManyNeeded = Math.round(this.p5.height / (this.#y * bodyRatio))
    //this <= and start from 1 is just my HACK xD But it's working
    for (let i = 0; i < howManyNeeded; ++i) {
      const offset = this.#y * (i * bodyRatio + peakRatio)
      this.p5.image(this.pipeBodySprite, -this.#y / 2, offset, this.#y, this.#y * bodyRatio)
    }
    this.p5.image(this.pipePeakSprite, -this.#y / 2, 0, this.#y, this.#y * peakRatio)
  }

  show () {
    this.p5.push()
    this.p5.translate(this.#x + this.#y / 2, this.#bottom)
    this.drawHalf()
    this.p5.translate(0, -this.#gap)
    this.p5.rotate(this.p5.PI)
    this.drawHalf()
    this.p5.pop()
  }

  update () {
    this.#x -= this.speed
  }

  offscreen () {
    return (this.#x < -this.#y)
  }

  get x () {
    return this.#x
  }

  get top () {
    return this.#top
  }

  get y () {
    return this.#y
  }

  get bottom () {
    return this.#bottom
  }

  get gap () {
    return this.#gap
  }
}
