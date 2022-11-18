import { ActivationFunction, sigmoid } from './ActivationFunction'
import { Matrix } from './Matrix'

export class NeuralNetwork {
  inputNodes: number
  hiddenNodes: number
  outputNodes: number
  weightsIH: Matrix
  weightsHO: Matrix
  biasH: Matrix
  biasO: Matrix
  learningRate: number
  activationFunction: ActivationFunction

  /**
   * Clones a Neural Network
   * @param inputNodes The Neural Network to be cloned
   */
  constructor (inputNodes: NeuralNetwork)
  /**
   * Creates a new Neural Network and randomize the weights and biases
   * @param inputNodes The count of nodes in the input of the Neural Network
   * @param hiddenNodes The count of nodes in the hidden layer of the Neural Network
   * @param outputNodes The count of nodes in the output of the Neural Network
   * @param learningRate [=0.1] The Neural Network Learning Rate
   * @param activationFunction [=sigmoid] The Neural Network Activation Function
   */
  constructor (inputNodes: number, hiddenNodes: number, outputNodes: number, learningRate?: number, activationFunction?: ActivationFunction)
  constructor (inputNodes: number|NeuralNetwork, hiddenNodes?: number, outputNodes?: number, learningRate = 0.1, activationFunction = sigmoid) {
    if (inputNodes instanceof NeuralNetwork) {
      const a = inputNodes
      this.inputNodes = a.inputNodes
      this.hiddenNodes = a.hiddenNodes
      this.outputNodes = a.outputNodes

      this.weightsIH = a.weightsIH.copy()
      this.weightsHO = a.weightsHO.copy()

      this.biasH = a.biasH.copy()
      this.biasO = a.biasO.copy()
    } else {
      this.inputNodes = inputNodes
      this.hiddenNodes = hiddenNodes as number
      this.outputNodes = outputNodes as number

      this.weightsIH = new Matrix(this.hiddenNodes, this.inputNodes).randomize()
      this.weightsHO = new Matrix(this.outputNodes, this.hiddenNodes).randomize()

      this.biasH = new Matrix(this.hiddenNodes, 1).randomize()
      this.biasO = new Matrix(this.outputNodes, 1).randomize()
    }
    this.learningRate = learningRate
    this.activationFunction = activationFunction
  }

  setLearningRate (learningRate = 0.1) {
    this.learningRate = learningRate
  }

  setActivationFunction (func = sigmoid) {
    this.activationFunction = func
  }

  private getOutputs (inputMatrix: Matrix) {
    return Matrix
      .multiply(this.weightsIH, inputMatrix)
      .add(this.biasH)
      .map(this.activationFunction.func)
  }

  predict (input: number[]) {
    // Generating the Hidden Outputs
    const inputs = Matrix.fromArray(input)
    const hidden = Matrix
      .multiply(this.weightsIH, inputs)
      .add(this.biasH)
      .map(this.activationFunction.func)

    // Generating the Output's Outputs
    const output = Matrix
      .multiply(this.weightsHO, hidden)
      .add(this.biasO)
      .map(this.activationFunction.func)

    // Sending back to the caller
    return output
      .toArray()
  }

  train (input: number[], target: number[]) {
    const inputMatrix = Matrix.fromArray(input)
    const targetMatrix = Matrix.fromArray(target)

    // Generating the Hidden Outputs
    const hidden = Matrix
      .multiply(this.weightsIH, inputMatrix)
      .add(this.biasH)
      // activation function!
      .map(this.activationFunction.func)

    // Generating the output's output!
    const outputMatrix = Matrix
      .multiply(this.weightsHO, hidden)
      .add(this.biasO)
      .map(this.activationFunction.func)

    /*
     * Calculate the error
     * ERROR = TARGETS - OUTPUTS
     */
    const outputErrors = Matrix.subtract(targetMatrix, outputMatrix)

    /*
     * let gradient = outputs * (1 - outputs);
     * Calculate gradient
     */
    const outputGradients = Matrix
      .map(outputMatrix, this.activationFunction.dFunc)
      .multiply(outputErrors)
      .multiply(this.learningRate)

    // Calculate deltas
    const hiddenTransposed = Matrix.transpose(hidden)
    const weightHODeltas = Matrix.multiply(outputGradients, hiddenTransposed)

    // Adjust the weights by deltas
    this.weightsHO.add(weightHODeltas)
    // Adjust the bias by its deltas (which is just the gradients)
    this.biasO.add(outputGradients)

    // Calculate the hidden layer errors
    const weightHOTransposed = Matrix.transpose(this.weightsHO)
    const hiddenErrors = Matrix.multiply(weightHOTransposed, outputErrors)

    // Calculate hidden gradient
    const hiddenGradient = Matrix
      .map(hidden, this.activationFunction.dFunc)
      .multiply(hiddenErrors)
      .multiply(this.learningRate)

    // Calculate input->hidden deltas
    const inputsTransposed = Matrix.transpose(inputMatrix)
    const weighsIHDeltas = Matrix.multiply(hiddenGradient, inputsTransposed)

    this.weightsIH.add(weighsIHDeltas)
    // Adjust the bias by its deltas (which is just the gradients)
    this.biasH.add(hiddenGradient)

    // Generating the Training's Outputs
    const output = Matrix
      .multiply(this.weightsHO, hidden)
      .add(this.biasO)
      .map(this.activationFunction.func)

    // Sending back to the caller
    return output
      .toArray()


  }

  serialize () {
    return JSON.stringify(this)
  }

  static deserialize (data: string|any) {
    if (typeof data === 'string') {
      data = JSON.parse(data)
    }
    const nn = new NeuralNetwork(data.inputNodes, data.hiddenNodes, data.outputNodes)
    nn.weightsIH = Matrix.deserialize(data.weightsIH)
    nn.weightsHO = Matrix.deserialize(data.weightsHO)
    nn.biasH = Matrix.deserialize(data.biasH)
    nn.biasO = Matrix.deserialize(data.biasO)
    nn.learningRate = data.learningRate
    return nn
  }

  copy () {
    return new NeuralNetwork(this)
  }
}
