export enum ColourDepth {
  MONOCHROME = 1,
  GRAYSCALE_4_BIT = 4,
  GRAYSCALE_8_BIT = 8,
  COLOUR_16_BIT = 16,
  COLOUR_32_BIT = 32,
}

/**
 * Creates a base64 image with the image pixels array
 * @param arr The array with the image data
 * @param depth The colour depth of the image
 * @returns
 */
export function arrayToSquaredImage (arr: number[], depth = ColourDepth.GRAYSCALE_8_BIT) {

  const offset = depth <= 8 ? 54 + Math.pow(2, depth)*4 : 54
  const height = Math.ceil(Math.sqrt(arr.length * 8/depth))

  //BMP Header
  let data  = 'BM'                         // ID field
  data += numberToCharCodeString(offset + arr.length)     // BMP size
  data += numberToCharCodeString(0)                       // unused
  data += numberToCharCodeString(offset)                  // pixel data offset

  //DIB Header
  data += numberToCharCodeString(40)                      // DIB header length
  data += numberToCharCodeString(height)                  // image height
  data += numberToCharCodeString(height)                  // image width
  data += String.fromCharCode(1, 0)        // colour panes
  data += String.fromCharCode(depth, 0)    // bits per pixel
  data += numberToCharCodeString(0)                       // compression method
  data += numberToCharCodeString(arr.length)              // size of the raw data
  data += numberToCharCodeString(2835)                    // horizontal print resolution
  data += numberToCharCodeString(2835)                    // vertical print resolution
  data += numberToCharCodeString(0)                       // colour palette, 0 == 2^n
  data += numberToCharCodeString(0)                       // important colours

  //Grayscale tables for bit depths <= 8
  if (depth <= 8) {
    data += numberToCharCodeString(0)

    for (let s = Math.floor(255/(Math.pow(2, depth)-1)), i = s; i < 256; i += s)  {
      data += numberToCharCodeString(i + i*256 + i*65536)
    }
  }

  // Invert the position of each pixel
  const reversed = [...arr].reverse()

  // Invert the colour of each pixel
  const inverted = reversed.map(num => Math.abs(num - 255))

  //Pixel data
  data += String.fromCharCode(...inverted)

  //Image element
  const image = 'data:image/bmp;base64,' + btoa(data)

  return image
}

/**
 * Converts a number to a char code string
 * @param num The number to be converted
 * @returns The char code string
 */
function numberToCharCodeString (num: number) {
  return String.fromCharCode(num&0xff, (num>>8)&0xff, (num>>16)&0xff, (num>>24)&0xff)
}

