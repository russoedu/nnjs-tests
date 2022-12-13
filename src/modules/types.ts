// TODO You must download the doodles and save them in the doodles folder (public)
export enum Doodle {
  AEROPLANE = '/doodles/_aeroplane.npy',
  CAR = '/doodles/_car.npy',
  CAT = '/doodles/_cat.npy',
  EIFFEL_TOWER = '/doodles/_eiffel-tower.npy',
  RAINBOW = '/doodles/_rainbow.npy',
  TRAIN = '/doodles/_train.npy',
  EMPTY = ''
}

export type Bytes = { bytes: Uint8Array }
export enum Category {
  CAT = 0,
  RAINBOW = 1,
  TRAIN = 2,
}

export const Result = [
  'I think it\'s a CAT',
  'I think it\'s a RAINBOW',
  'I think it\'s a TRAIN',
]

export type CategoryEntry = {
  raw: Uint8Array,
  normalised: number[],
  labelRaw: Category,
  label: number[],
}
export type CategoryData = {
  training: CategoryEntry[]
  testing: CategoryEntry[]
}
