export class NeuralNetwork {
  inputNodes: number
  hiddenNodes: number
  outputNodes: number
  constructor (inputNodes: number, hiddenNodes: number, outputNodes: number) {
    this.inputNodes = inputNodes
    this.hiddenNodes = hiddenNodes
    this.outputNodes = outputNodes
  }
}
