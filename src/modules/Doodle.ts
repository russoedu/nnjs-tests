import { NeuralNetwork } from './NeuralNetwork'
import { Bytes, Category, CategoryData, CategoryEntry } from './types'
import p5 from 'p5'

export function trainEpoch (nn: NeuralNetwork, training: CategoryEntry[], index: number) {
  console.log(`Training for epoch ${index} with ${training.length}`)
  for (let i = 0; i < training.length; i++) {
    const input = training[i].normalised
    const target = training[i].label
    nn.train(input, target)
  }
}

export function testAll (nn: NeuralNetwork, testing: CategoryEntry[], index: number) {
  let correct = 0
  console.log(`Testing for epoch ${index}`)
  for (let i = 0; i < testing.length; i++) {
    const input = testing[i].normalised
    const output = testing[i].labelRaw
    const result = nn.predict(input)

    const max = Math.max(...result)
    const prediction = result.findIndex(v => v === max)

    if (output === prediction)
      correct ++
  }

  const percent = 100 * correct / testing.length

  return percent
}
export function prepare (catsData: Bytes, rainbowsData: Bytes, trainsData: Bytes, size: number) {
  const training: CategoryEntry[] = []
  const testing: CategoryEntry[] = []

  const cats: CategoryData =     { training: [], testing: [] }
  const rainbows: CategoryData = { training: [], testing: [] }
  const trains: CategoryData =   { training: [], testing: [] }

  prepareData(cats, catsData, Category.CAT, training, testing, size)
  prepareData(rainbows, rainbowsData, Category.RAINBOW, training, testing, size)
  prepareData(trains, trainsData, Category.TRAIN, training, testing, size)
  p5.prototype.shuffle(training, true)

  return {
    training,
    testing,
  }
}

export function prepareData (data: CategoryData, dataBytes: Bytes, labelRaw: Category, training: CategoryEntry[], testing: CategoryEntry[], size: number) {
  const totalEntries = dataBytes.bytes.length / size
  const trainingEntries = Math.floor(totalEntries * 0.8)

  for (let i = 0; i < totalEntries; i++) {
    const offset = i * size
    const raw = dataBytes.bytes.subarray(offset, offset + size)
    const normalised = Array.from(raw).map(v => Number(v) / 255.0)
    const label = [0, 0, 0]
    label[labelRaw] = 1
    const entryData = { raw, normalised, label, labelRaw }

    if (i < trainingEntries){
      data.training[i] = entryData
      training.push(entryData)
    } else {
      data.testing[i - trainingEntries] = entryData
      testing.push(entryData)
    }
  }
}
