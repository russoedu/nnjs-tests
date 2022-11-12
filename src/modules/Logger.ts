export enum LogType {
  GUESS,
  ERROR,
  GUESS_AND_ERROR,
}

export function log (inputs: any, guess: number, desired: number, error: number, type: LogType) {
  switch (type) {
    case LogType.ERROR:
      if (guess !== desired) console.log('❌', error, inputs)
      break

    case LogType.GUESS:
      if (guess === desired) console.log('✔️', error, inputs)
      break
    default:
      console.log(guess === desired ? '✔️' : '❌', error, inputs)
      break
  }
}
