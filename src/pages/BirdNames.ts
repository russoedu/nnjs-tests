import { uniqueNamesGenerator, adjectives, animals, colors } from 'unique-names-generator'

export class BirdNames {
  list: {
    hash: number,
    name: string,
    birth: Date
  }[] = []

  add (hash: number) {
    const bird = this.get(hash)

    if (bird) {
      return bird
    } else {
      const newBird = {
        name: uniqueNamesGenerator({
          dictionaries: [colors, adjectives, animals],
          length:       3,
          style:        'capital',
          separator:    ' ',
        }),
        hash,
        birth: new Date(),
      }
      this.list.push(newBird)

      return newBird
    }
  }

  get (hash: number) {
    return this.list.find(bird => bird.hash === hash)
  }

  name (hash: number) {
    const bird = this.get(hash)

    return bird?.name
  }
}
