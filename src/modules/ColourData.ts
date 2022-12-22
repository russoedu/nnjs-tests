import { Colour, ColourDataT, colourLabels, Label } from './types'
import * as tf from '@tensorflow/tfjs'

class ColourData {
  #loaded = false
  #data: { colour: Colour, rawColour: Colour, label: Label }[] = []
  #length = 0

  /**
   * Loads the training data from JSON
   */
  async loadData () {
    if (!this.#loaded) {
      const response = await fetch('/colourData.json')
      const data: ColourDataT = await response.json() as ColourDataT


      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const colour = data[key]
          this.#data.push({
            rawColour: [colour.r, colour.g, colour.b],
            colour:    [colour.r / 255, colour.g / 255, colour.b / 255],
            label:     colourLabels.indexOf(colour.label),
          })
        }
      }
      this.#length = this.#data.length
      this.#loaded = true
    }
    return true
  }

  get colours () {
    return this.#data.map(d => d.colour)
  }

  get labels () {
    return this.#data.map(d => d.label)
  }

  get xs () {
    return tf.tensor2d(this.colours)
  }

  get ys () {
    const labelsTensor = tf.tensor1d(this.labels, 'int32')
    const ys = tf.oneHot(labelsTensor, colourLabels.length)
    labelsTensor.dispose()

    return ys
  }

  get rawColours () {
    return this.#data.map(d => d.rawColour)
  }

  get length () {
    return this.#length
  }

  get sheetData () {
    return this.#data
      // .sort((a, b) => a.label > b.label ? -1 : 1)
      .map((d, i) => ({
        id:              `sheet-colour-${i}`,
        backgroundColor: `rgb(${d.rawColour[0]} ${d.rawColour[1]} ${d.rawColour[2]})`,
        label:           colourLabels[d.label],
      }))
  }

  shuffle () {
    let currentIndex = this.#length
    let randomIndex = 0

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--;

      // And swap it with the current element.
      [this.#data[currentIndex], this.#data[randomIndex]] = [
        this.#data[randomIndex],
        this.#data[currentIndex],
      ]
    }
  }
}

const colourData = new ColourData()
export { colourData }
