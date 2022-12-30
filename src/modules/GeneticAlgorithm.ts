import { Bird } from './Bird'
import { P5CanvasInstance } from 'react-p5-wrapper'
import { BirdBrain } from './BirdBrain'
import p5 from 'p5'
import { NeuralNetwork } from './NeuralNetwork'

export class GeneticAlgorithm {
  p5: P5CanvasInstance
  totalBirds: number
  birds: Bird[] = []
  birdSprites: p5.Image[]
  birdBrains: BirdBrain[] = []

  constructor (p5: P5CanvasInstance, totalBirds: number, birdSprites: p5.Image[]) {
    this.p5 = p5
    this.totalBirds = totalBirds
    this.birdSprites = birdSprites
  }

  nextGeneration (mutationRate: number, lastBirdBrain?: string) {
    this.birds = []
    this.birdBrains = []

    for (let i = 0; i < this.totalBirds; i++) {
      const brain = lastBirdBrain
        ? i === 0 // The first bird is a copy as it might be smarter than the mutated
          ? NeuralNetwork.deserialize(lastBirdBrain)
          : NeuralNetwork.deserialize(lastBirdBrain).mutate(mutationRate)
        : undefined


      const bird = new Bird(this.p5, this.birdSprites)
      this.birds.push(bird)
      this.birdBrains.push(new BirdBrain(this.p5, bird, brain))
    }
  }
}
