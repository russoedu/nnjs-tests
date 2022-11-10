import p5 from 'p5'

export class Perceptron {
  public weights: any
  public c: any

  constructor (n: number, c: number, p: p5) {
    // Array of weights for inputs
    this.weights = new Array(n)
    // Start with random weights
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = p.random(-1, 1)
    }
    this.c = c // learning rate/constant
  }

  /*
   * Function to train the Perceptron
   * Weights are adjusted based on "desired" answer
   */
  train (inputs: number[], desired: number) {
    // Guess the result
    const guess = this.feedforward(inputs)
    /*
     * Compute the factor for changing the weight based on the error
     * Error = desired output - guessed output
     * Note this can only be 0, -2, or 2
     * Multiply by learning constant
     */
    const error = desired - guess
    // Adjust weights based on weightChange * input
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += this.c * error * inputs[i]
    }
  }

  // Guess -1 or 1 based on input values
  feedforward (inputs: number[]) {
    // Sum all values
    let sum = 0
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i]
    }
    // Result is sign of the sum, -1 or 1
    return this.activate(sum)
  }

  activate (sum: number) {
    if (sum > 0) return 1
    else return -1
  }

  // Return weights
  getWeights () {
    return this.weights
  }
}
