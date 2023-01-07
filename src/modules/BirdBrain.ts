import { Bird } from './Bird'
import { NeuralNetwork } from './NeuralNetwork'
import { Pipe } from './Pipe'
import { P5CanvasInstance } from 'react-p5-wrapper'

export class BirdBrain {
  brain: NeuralNetwork
  bird: Bird
  canvas: P5CanvasInstance

  constructor (canvas: P5CanvasInstance, bird: Bird, brain?: NeuralNetwork) {
    this.bird = bird
    this.canvas = canvas
    this.brain = typeof brain === 'undefined'
      ? new NeuralNetwork(5, 10, 1)
      : brain.copy()
  }

  think (pipes: Pipe[]) {
    const input = [
      this.bird.y / this.canvas.height,
      pipes[0].x / this.canvas.width,
      pipes[0].top / this.canvas.height,
      pipes[0].bottom / this.canvas.height,
      (pipes[0].speed - 3) / 2,
    ]

    const output = this.brain.predict(input)

    if (output[0] > 0.5) {
      this.bird.flyUp()
    }
  }
}
