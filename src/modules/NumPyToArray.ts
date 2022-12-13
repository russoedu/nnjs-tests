import { Doodle } from '../modules/types'
import { arrayToSquaredImage } from './arrayToSquaredImage'

const shapeRegEx = /'shape':\s?\((\d+?),?\s?(\d+?)?\)/m
const headerSize = 80
/**
 * Converts the data from NumPy to be accessible like an array
 */
export class NumPyToArray {
  total = 0
  size = 0
  #arrayBuffer: ArrayBuffer|Buffer
  /**
   * Reads the header and the data and sets the total entries and the size of each entry. The data can now be accessible using the array or the image functions
   * @param data The data buffer or array buffer
   */
  constructor (data: ArrayBuffer|Buffer) {
    const headerData = this.arrayBufferToArray(data.slice(0, headerSize))
    const header = String.fromCharCode(...headerData)

    const shape = shapeRegEx.exec(header)

    if (!shape || shape.length < 2) throw 'Invalid NumPy Header'

    this.total = Number(shape[1])
    this.size = Number(shape[2] || 1)

    if (data.byteLength - headerSize !== this.size * this.total) throw 'Invalid NumPy Header'

    this.#arrayBuffer = data instanceof ArrayBuffer
      ? data.slice(headerSize)
      : data.subarray(headerSize)
  }

  get uint8array () {
    const uint8array = new Uint8Array(this.#arrayBuffer)

    return uint8array
  }

  /**
   * Retrieves the array in the selected position. The size of each array can be accessed using the "size" property
   * @param position The position in the data
   * @returns The array in the selected position
   */
  array (position: number) {
    return this.arrayBufferToArray(
      this.#arrayBuffer.slice(position * this.size, (position + 1) * this.size)
    )
  }

  /**
   * Retrieves the image in the selected position. The size of each array can be accessed using the "size" property
   * @param position The position in the data
   * @returns The array in the selected position
   */
  image (position: number) {
    return arrayToSquaredImage(this.array(position))
  }

  /**
   * Creates a new NumPyToArray instance from the file URL
   * @param url The URL of the NumPy file
   * @returns A new NumPyToArray instance
   */
  static async fromUrl (url: string) {
    return fetch(url, { method: 'GET', redirect: 'follow', mode: 'cors' })
      .then(file => {
        return file.arrayBuffer()
      })
      .then(arrayBuffer => new NumPyToArray(arrayBuffer))
  }

  /**
   * Creates a new NumPyToArray instance for each file URL
   * @param doodles The list of URLs of the NumPy files
   * @returns A list of new NumPyToArray instances
   */
  static async fromUrls (doodles: (keyof typeof Doodle)[]): Promise<{
    doodle: Doodle,
    data:   NumPyToArray,
  }[]> {
    const result: { doodle: Doodle, data: NumPyToArray }[] = []
    for (const url of doodles) {
      if (url !== 'EMPTY'){
        result.push({
          doodle: url as Doodle,
          data:   await NumPyToArray.fromUrl(Doodle[url]),
        })}
    }

    return result
  }

  /**
   *
   * @param arrayBuffer The
   * @returns
   */
  private arrayBufferToArray (arrayBuffer: ArrayBuffer) {
    return Array.from(new Uint8Array(arrayBuffer))
  }
}
