import { Bird } from './Bird'
import { P5CanvasInstance } from 'react-p5-wrapper'
import { BirdBrain } from './BirdBrain'
import p5 from 'p5'
import { SavedBirds } from './SavedBirds'
import { NeuralNetwork } from './NeuralNetwork'
import { smartestKnownBird } from './types'

export class BirdGeneticAlgorithm {
  canvas: P5CanvasInstance
  totalBirds: number
  birds: Bird[] = []
  birdSprites: p5.Image[]
  birdBrains: BirdBrain[] = []
  savedBirds: SavedBirds

  constructor (canvas: P5CanvasInstance, totalBirds: number, birdSprites: p5.Image[]) {
    this.canvas = canvas
    this.totalBirds = totalBirds
    this.birdSprites = birdSprites
    this.savedBirds = new SavedBirds()
  }

  nextGeneration (mutationRate: number, loadSmartest = false) {
    if (this.savedBirds.list.length > 0) {
      this.savedBirds.reset()

      this.birds = [this.savedBirds.fittest.bird]
      this.birdBrains = [this.savedBirds.fittest.brain]

      for (let i = 1; i < this.totalBirds; i++) {
        const brain = this.savedBirds.fittest.brain.brain.mutate(mutationRate)

        const bird = new Bird(this.canvas, this.birdSprites)
        const birdBrain = new BirdBrain(this.canvas, bird, brain)
        this.birds.push(bird)
        this.birdBrains.push(birdBrain)
        this.savedBirds.push(bird, birdBrain)
      }
    } else {
      for (let i = 0; i < this.totalBirds; i++) {
        const bird = new Bird(this.canvas, this.birdSprites)
        const birdBrain = new BirdBrain(this.canvas, bird)

        this.birds.push(bird)
        this.birdBrains.push(birdBrain)
        this.savedBirds.push(bird, birdBrain)
      }
    }

    if (loadSmartest) {
      const bird = new Bird(this.canvas, this.birdSprites)
      const brain = NeuralNetwork.deserialize(smartestKnownBird)
      const birdBrain = new BirdBrain(this.canvas, bird, brain)
      this.birds.push(bird)
      this.birdBrains.push(birdBrain)
      this.savedBirds.push(bird, birdBrain, 'SMARTEST BIRD')
    }
  }
}
