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

export const smartestKnownBird = {
  inputNodes:  5,
  hiddenNodes: 10,
  outputNodes: 1,
  weightsIH:   {
    rows: 10,
    cols: 5,
    data: [
      [
        -0.001138170210371359,
        0.004168195592277098,
        0.05784601575131098,
        -0.2989987349897513,
        -0.0029396867009036857,
      ],
      [
        -0.015415405995326564,
        -0.09551982870039918,
        0.365375924237445,
        -0.05753274313142946,
        0.7059473870198487,
      ],
      [
        0.1418796447816499,
        -0.20648872729912915,
        0.0003275808129922799,
        -0.44831482186655064,
        -0.006358613995298645,
      ],
      [
        0.019349212425039,
        0.00849843811282948,
        -0.10483496312782283,
        0.21364253593372712,
        0.1694304353717141,
      ],
      [
        -0.25363010365473926,
        0.02814834646853533,
        0.7168279331282273,
        -0.39558391588137165,
        0.026496836744940404,
      ],
      [
        0.2171597339459416,
        -0.004236521838092106,
        0.0005385963604877352,
        -0.004160915502289668,
        0.10330248187119545,
      ],
      [
        0.7700385275883003,
        0.01920151466484356,
        0.04834933516195471,
        -0.5738403291967711,
        -0.0033677938920926268,
      ],
      [
        -0.161209682393704,
        -0.02360592868732023,
        -0.035493144942781545,
        0.8404774910299074,
        -0.007913142308355667,
      ],
      [
        0.4058876271568407,
        0.0059103225256006515,
        -0.08500773767622812,
        -0.21305412936433712,
        0.040627076648015965,
      ],
      [
        -0.00465470957571988,
        -0.22363464877775693,
        0.000058760321346694114,
        -0.46135490266119994,
        -0.06652437934680065,
      ],
    ],
  },
  weightsHO: {
    rows: 1,
    cols: 10,
    data: [
      [
        0.014111344718665096,
        -0.001482438011238394,
        0.003998758090501154,
        0.011261333964301325,
        0.0030829322873319838,
        -0.9349402844302311,
        0.8806101883090367,
        -0.009860910374169585,
        0.07115397441963553,
        0.015555517729108351,
      ],
    ],
  },
  biasH: {
    rows: 10,
    cols: 1,
    data: [
      [
        0.9911314384056752,
      ],
      [
        0.34932809591173214,
      ],
      [
        -0.23429589137507376,
      ],
      [
        0.1913929543418499,
      ],
      [
        -0.002385918703690942,
      ],
      [
        -0.05193577622282442,
      ],
      [
        -0.029732415641272353,
      ],
      [
        0.03193274029675369,
      ],
      [
        -0.7814382484182685,
      ],
      [
        0.005733927638185107,
      ],
    ],
  },
  biasO: {
    rows: 1,
    cols: 1,
    data: [
      [
        -0.00954975575374828,
      ],
    ],
  },
  learningRate:       0.1,
  activationFunction: {},
}


