import { Matrix } from './Matrix'

describe('Matrix', () => {
  test('add scalar to matrix', () => {
    const m = new Matrix(3, 3)
    m.data[0] = [1, 2, 3]
    m.data[1] = [4, 5, 6]
    m.data[2] = [7, 8, 9]
    m.add(1)
    expect(m).toEqual({
      rows: 3,
      cols: 3,
      data: [
        [2, 3, 4],
        [5, 6, 7],
        [8, 9, 10],
      ],
    })
  })
  test('add matrix to other matrix', () => {
    const m = new Matrix(2, 2)
    m.data[0] = [1, 2]
    m.data[1] = [3, 4]
    const n = new Matrix(2, 2)
    n.data[0] = [10, 11]
    n.data[1] = [12, 13]
    m.add(n)
    expect(m).toEqual({
      rows: 2,
      cols: 2,
      data: [
        [11, 13],
        [15, 17],
      ],
    })
  })
  test('subtract matrix from other matrix', () => {
    const m = new Matrix(2, 2)
    m.data[0] = [10, 11]
    m.data[1] = [12, 13]
    const n = new Matrix(2, 2)
    n.data[0] = [1, 2]
    n.data[1] = [3, 4]
    const mMinusN = Matrix.subtract(m, n)
    expect(mMinusN).toEqual({
      rows: 2,
      cols: 2,
      data: [
        [9, 9],
        [9, 9],
      ],
    })
  })
  test('matrix product', () => {
    const m = new Matrix(2, 3)
    m.data[0] = [1, 2, 3]
    m.data[1] = [4, 5, 6]
    const n = new Matrix(3, 2)
    n.data[0] = [7, 8]
    n.data[1] = [9, 10]
    n.data[2] = [11, 12]
    const mn = Matrix.multiply(m, n)
    expect(mn).toEqual({
      rows: 2,
      cols: 2,
      data: [
        [58, 64],
        [139, 154],
      ],
    })
  })
  test('hadamard product', () => {
    const m = new Matrix(3, 2)
    m.data[0] = [1, 2]
    m.data[1] = [3, 4]
    m.data[2] = [5, 6]
    const n = new Matrix(3, 2)
    n.data[0] = [7, 8]
    n.data[1] = [9, 10]
    n.data[2] = [11, 12]
    m.multiply(n)
    expect(m).toEqual({
      rows: 3,
      cols: 2,
      data: [
        [7, 16],
        [27, 40],
        [55, 72],
      ],
    })
  })
  test('scalar product', () => {
    const m = new Matrix(3, 2)
    m.data[0] = [1, 2]
    m.data[1] = [3, 4]
    m.data[2] = [5, 6]
    m.multiply(7)
    expect(m).toEqual({
      rows: 3,
      cols: 2,
      data: [
        [7, 14],
        [21, 28],
        [35, 42],
      ],
    })
  })
  test('transpose matrix - (1, 1)', () => {
    const m = new Matrix(1, 1)
    m.data[0] = [1]
    const mt = Matrix.transpose(m)
    expect(mt).toEqual({
      rows: 1,
      cols: 1,
      data: [
        [1],
      ],
    })
  })
  test('transpose matrix - (2, 3) to (3, 2)', () => {
    const m = new Matrix(2, 3)
    m.data[0] = [1, 2, 3]
    m.data[1] = [4, 5, 6]
    const mt = Matrix.transpose(m)
    expect(mt).toEqual({
      rows: 3,
      cols: 2,
      data: [
        [1, 4],
        [2, 5],
        [3, 6],
      ],
    })
  })
  test('transpose matrix - (3, 2) to (2, 3)', () => {
    const m = new Matrix(3, 2)
    m.data[0] = [1, 2]
    m.data[1] = [3, 4]
    m.data[2] = [5, 6]
    const mt = Matrix.transpose(m)
    expect(mt).toEqual({
      rows: 2,
      cols: 3,
      data: [
        [1, 3, 5],
        [2, 4, 6],
      ],
    })
  })
  test('transpose matrix - (1, 5) to (5, 1)', () => {
    const m = new Matrix(1, 5)
    m.data[0] = [1, 2, 3, 4, 5]
    const mt = Matrix.transpose(m)
    expect(mt).toEqual({
      rows: 5,
      cols: 1,
      data: [
        [1],
        [2],
        [3],
        [4],
        [5],
      ],
    })
  })
  test('transpose matrix - (5, 1) to (1, 5)', () => {
    const m = new Matrix(5, 1)
    m.data[0] = [1]
    m.data[1] = [2]
    m.data[2] = [3]
    m.data[3] = [4]
    m.data[4] = [5]
    const mt = Matrix.transpose(m)
    expect(mt).toEqual({
      rows: 1,
      cols: 5,
      data: [
        [1, 2, 3, 4, 5],
      ],
    })
  })
  test('mapping with static map', () => {
    const m = new Matrix(3, 3)
    m.data[0] = [1, 2, 3]
    m.data[1] = [4, 5, 6]
    m.data[2] = [7, 8, 9]
    const mapped = Matrix.map(m, elem => elem * 10)
    expect(mapped).toEqual({
      rows: 3,
      cols: 3,
      data: [
        [10, 20, 30],
        [40, 50, 60],
        [70, 80, 90],
      ],
    })
  })
  test('mapping with instance map', () => {
    const m = new Matrix(3, 3)
    m.data[0] = [1, 2, 3]
    m.data[1] = [4, 5, 6]
    m.data[2] = [7, 8, 9]
    m.map(elem => elem * 10)
    expect(m).toEqual({
      rows: 3,
      cols: 3,
      data: [
        [10, 20, 30],
        [40, 50, 60],
        [70, 80, 90],
      ],
    })
  })
  test('error handling of addition when columns and rows of A don\'t match columns and rows of B.', () => {
    const m1 = new Matrix(1, 2)
    const m2 = new Matrix(3, 4)
    try {
      m1.add(m2)
    } catch (error) {
      expect(error).toBe('Columns and Rows of A must match Columns and Rows of B.')
    }
  })
  test('error handling of static subtraction when columns and rows of A don\'t match columns and rows of B.', () => {
    const m1 = new Matrix(1, 2)
    const m2 = new Matrix(3, 4)

    try {
      Matrix.subtract(m1, m2)
    } catch (error) {
      expect(error).toBe('Columns and Rows of A must match Columns and Rows of B.')
    }
  })
  test('error handling of hadamard product when columns and rows of A don\'t match columns and rows of B.', () => {
    const m1 = new Matrix(1, 2)
    const m2 = new Matrix(3, 4)
    try {
      m1.multiply(m2)
    } catch (error) {
      expect(error).toBe('Columns and Rows of A must match Columns and Rows of B.')
    }
  })
  test('error handling of matrix product when columns of A don\'t match rows of B.', () => {
  // Replace console.log with a jest mock so we can see if it has been called
    const m1 = new Matrix(1, 2)
    const m2 = new Matrix(3, 4)
    try {
      Matrix.multiply(m1, m2)
    } catch (error) {
      expect(error).toBe('Columns of A must match rows of B.')
    }
  })
  test('printing', () => {
  // Replace console.table with a jest mock so we can see if it has been called
    global.console.table = jest.fn()

    const m1 = new Matrix(2, 3)
    m1.randomize()
    m1.print()

    // Check if the mock console.table has been called
    expect(global.console.table).toHaveBeenCalledWith(m1.data)
  })
  test('matrix from array', () => {
    const array = [1, 2, 3]
    const m = Matrix.fromArray(array)
    expect(m).toEqual({
      rows: 3,
      cols: 1,
      data: [
        [1],
        [2],
        [3],
      ],
    })
  })
  test('matrix to array', () => {
    const m = new Matrix(3, 3)
    m.data[0] = [1, 2, 3]
    m.data[1] = [4, 5, 6]
    m.data[2] = [7, 8, 9]

    const array = m.toArray()
    expect(array).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
  test('chanining matrix methods', () => {
    const m = new Matrix(3, 3)
    m.data[0] = [1, 2, 3]
    m.data[1] = [4, 5, 6]
    m.data[2] = [7, 8, 9]

    m.map(e => e - 1).multiply(10).add(6).print()

    expect(m).toEqual({
      rows: 3,
      cols: 3,
      data: [
        [6, 16, 26],
        [36, 46, 56],
        [66, 76, 86],
      ],
    })
  })
  test('instance map with row and column params', () => {
    const m = new Matrix(3, 3)
    m.data[0] = [1, 2, 3]
    m.data[1] = [4, 5, 6]
    m.data[2] = [7, 8, 9]

    m.map((e, row, col) => e * 100 + row * 10 + col)

    expect(m).toEqual({
      rows: 3,
      cols: 3,
      data: [
        [100, 201, 302],
        [410, 511, 612],
        [720, 821, 922],
      ],
    })
  })
  test('static map with row and column params', () => {
    const m = new Matrix(3, 3)
    m.data[0] = [1, 2, 3]
    m.data[1] = [4, 5, 6]
    m.data[2] = [7, 8, 9]

    const mapped = Matrix.map(m, (e, row, col) => e * 100 + row * 10 + col)

    expect(mapped).toEqual({
      rows: 3,
      cols: 3,
      data: [
        [100, 201, 302],
        [410, 511, 612],
        [720, 821, 922],
      ],
    })
  })
  test('matrix (de)serialization', () => {
    const m = new Matrix(5, 5)
    m.randomize()

    const n = Matrix.deserialize(m.serialize())

    expect(n).toEqual({
      rows: m.rows,
      cols: m.cols,
      data: m.data,
    })
  })
  test('matrix copy', () => {
    const m = new Matrix(5, 5)
    m.randomize()

    const n = m.copy()

    expect(n).toEqual({
      rows: m.rows,
      cols: m.cols,
      data: m.data,
    })
    expect(n.data).not.toBe(m.data)
  })
})
