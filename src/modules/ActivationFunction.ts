export class ActivationFunction {
  func: (x: number) => number
  dFunc: (x: number) => number

  constructor (func: (x: number) => number, dFunc: (x: number) => number) {
    this.func = func
    this.dFunc = dFunc
  }
}

export const sigmoid = new ActivationFunction(
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1 - y)
)

export const tanh = new ActivationFunction(
  x => Math.tanh(x),
  y => 1 - (y * y)
)
