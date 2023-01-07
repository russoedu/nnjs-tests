import { adjectives, animals, uniqueNamesGenerator } from 'unique-names-generator'
import { Bird } from './Bird'
import { BirdBrain } from './BirdBrain'
import { SavedBird } from './types'

export class SavedBirds {
  list: SavedBird[] = []

  push (bird: Bird, brain: BirdBrain, name?: string) {
    const newBird = {
      name: name || uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        length:       2,
        style:        'capital',
        separator:    ' ',
      }),
      birth: new Date(),
      brain: brain,
      bird:  bird,
    }
    this.list.push(newBird)

    return newBird
  }

  reset () {
    const fittest = this.fittest

    this.list = [this.fittest]

    fittest.bird.distance = 0

    return fittest.name
  }

  get fittest () {
    const distances = this.list
      .map(entry => entry.bird.distance)

    const maxDistance = Math.max(...distances)

    const fittest = this.list
      .find(entry => entry.bird.distance === maxDistance) as SavedBird

    return fittest
  }
}
