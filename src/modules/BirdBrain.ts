import { Bird } from './Bird'
import { NeuralNetwork } from './NeuralNetwork'
import { Pipe } from './Pipe'
import { P5CanvasInstance } from 'react-p5-wrapper'

export class BirdBrain {
  brain: NeuralNetwork
  bird: Bird
  p5: P5CanvasInstance

  constructor (p5: P5CanvasInstance, bird: Bird, brain?: NeuralNetwork) {
    this.bird = bird
    this.p5 = p5
    this.brain = typeof brain === 'undefined'
      ? new NeuralNetwork(5, 10, 1)
      : brain
  }

  think (pipes: Pipe[]) {
    const input = [
      this.bird.y / this.p5.height,
      pipes[0].x / this.p5.width,
      pipes[0].top / this.p5.height,
      pipes[0].bottom / this.p5.height,
      (pipes[0].speed - 3) / 2,
    ]

    const output = this.brain.predict(input)

    if (output[0] > 0.5) {
      this.bird.flyUp()
    }
  }
}
