import * as tf from '@tensorflow/tfjs'
import p5 from 'p5'

export class NeuralNetwork {
  model: tf.Sequential
  inputNodes: number
  hiddenNodes: number
  outputNodes: number
  learningRate: number

  /**
   * Clones a Neural Network
   * @param model The Neural Network to be cloned
   * @param inputNodes The count of nodes in the input of the Neural Network
   * @param hiddenNodes The count of nodes in the hidden layer of the Neural Network
   * @param outputNodes The count of nodes in the output of the Neural Network
   * @param learningRate [=0.1] The Neural Network Learning Rate
   */
  constructor (model: tf.Sequential, inputNodes: number, hiddenNodes: number, outputNodes: number, learningRate?: number)
  /**
   * Creates a new Neural Network and randomize the weights and biases
   * @param inputNodes The count of nodes in the input of the Neural Network
   * @param hiddenNodes The count of nodes in the hidden layer of the Neural Network
   * @param outputNodes The count of nodes in the output of the Neural Network
   * @param learningRate [=0.1] The Neural Network Learning Rate
   */
  constructor (inputNodes: number, hiddenNodes: number, outputNodes: number, learningRate?: number)
  constructor (inputNodesOrModel: number|tf.Sequential, b?: number, c?: number, d?: number, learningRate?: number) {
    if (inputNodesOrModel instanceof tf.Sequential) {
      this.inputNodes = b as number
      this.hiddenNodes = c as number
      this.outputNodes = d as number
      this.learningRate = learningRate || 0.1

      this.model = inputNodesOrModel
    } else {
      this.inputNodes = inputNodesOrModel
      this.hiddenNodes = b as number
      this.outputNodes = c as number
      this.learningRate = d || 0.1

      this.model = this.createModel()
    }
  }

  copy () {
    const modelCopy = this.createModel()

    tf.tidy(() => {
      const weights = this.model.getWeights()
      const weightCopies = weights.map(weight => weight.clone())

      modelCopy.setWeights(weightCopies)
    })

    return new NeuralNetwork(modelCopy, this.inputNodes, this.hiddenNodes, this.outputNodes)
  }

  mutate (mutationRate: number) {
    tf.tidy(() => {
      const weights = this.model.getWeights()
      const mutatedWeights = []
      for (let i = 0; i < weights.length; i++) {
        const tensor = weights[i]
        const shape = weights[i].shape
        const values = tensor.dataSync().slice()
        for (let j = 0; j < values.length; j++) {
          if (p5.prototype.random(1) < mutationRate) {
            const w = values[j]
            values[j] = w + p5.prototype.randomGaussian()
          }
        }
        const newTensor = tf.tensor(values, shape)
        mutatedWeights[i] = newTensor
      }
      this.model.setWeights(mutatedWeights)
    })
  }

  dispose () {
    this.model.dispose()
  }

  predict (inputs: number[]) {
    return tf.tidy(() => {
      const xs = tf.tensor2d([inputs])
      const ys = this.model.predict(xs) as tf.Tensor<tf.Rank>
      const outputs = ys.dataSync()
      // console.log(outputs);
      return outputs
    })
  }

  createModel () {
    const model = tf.sequential()
    const hidden = tf.layers.dense({
      units:      this.hiddenNodes,
      inputShape: [this.inputNodes],
      activation: 'sigmoid',
    })
    model.add(hidden)
    const output = tf.layers.dense({
      units:      this.outputNodes,
      activation: 'sigmoid',
    })
    model.add(output)
    return model
  }
}
