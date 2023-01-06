import { Bird } from './Bird'
import { BirdBrain } from './BirdBrain'

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

export const colourLabels = [
  'red-ish',
  'green-ish',
  'blue-ish',
  'orange-ish',
  'yellow-ish',
  'pink-ish',
  'purple-ish',
  'brown-ish',
  'grey-ish',
]

export const colourLabelsColour = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ff7500',
  '#ffff00',
  '#ff0075',
  '#7500ff',
  '#753000',
  '#e5e5e5',
]

export type ColourDataEntry = {
  'r': number,
  'b': number,
  'g': number,
  'label': typeof colourLabels[number],
  'uid': string
}

export type ColourDataT = { [key: number]: ColourDataEntry }

export type Colour = [number, number, number]
export type Label = number

export type Loss = {
  loss: number,
  val_loss: number,
  acc: number,
  val_acc: number,
}

export const modalStyle = {
  position:  'absolute',
  top:       '50%',
  left:      '50%',
  transform: 'translate(-50%, -50%)',
  width:     400,
  bgcolor:   'background.paper',
  border:    '2px solid #000',
  boxShadow: 24,
  p:         4,
}

export enum TrainingStatus {
  LOADING_DATA,
  MODEL_SET,
  TRAINING,
  TRAINED,
}

export type SavedBird = {
  name: string,
  birth: Date
  brain: BirdBrain
  bird: Bird
}

export type SavedBirdTf = {
  name: string,
  birth: Date
  bird: Bird
}
