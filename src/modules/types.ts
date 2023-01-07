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
        -0.03722335183820157,
        -0.13462007881274787,
        0.019544667127163285,
        0.9219098520466678,
        -0.04058795643390829,
      ],
      [
        -0.5620837212308607,
        0.0005076196771041973,
        0.008567568521351031,
        -0.011231838055259824,
        0.0054594145619327045,
      ],
      [
        0.5776338993921153,
        0.013804481777304345,
        0.2363015429298414,
        0.4387524540893066,
        0.06787051787436804,
      ],
      [
        -0.05772065036209682,
        0.2939721508944848,
        0.0072244092460028355,
        -0.0302070751642764,
        -0.006091845582606245,
      ],
      [
        0.01960108444627918,
        0.05342017473558211,
        -0.020838528327636736,
        0.11570665619559121,
        -0.020286198309228013,
      ],
      [
        0.20649570539705475,
        -0.03467939311968792,
        0.06694131506165489,
        -0.023297506209100052,
        -0.008910064803382382,
      ],
      [
        0.11762766431431845,
        0.0030683087453297233,
        -0.024344785363332146,
        -0.03506998262759485,
        0.06537158541061057,
      ],
      [
        -0.30970894873695104,
        -0.01973155154624389,
        0.010696216452205302,
        -0.019919428131818254,
        -0.00813869689739276,
      ],
      [
        0.8030815161522998,
        -0.002940916996679362,
        -0.08894445863400578,
        -0.9690600184062971,
        -0.006074406102015494,
      ],
      [
        0.6016099785424159,
        0.040951606870511595,
        0.006202246525304175,
        -0.016966179026498593,
        -0.32758758243420233,
      ],
    ],
  },
  weightsHO: {
    rows: 1,
    cols: 10,
    data: [
      [
        -0.016674987781816017,
        -0.0004552417720952879,
        0.18182533377642743,
        0.002655674205488297,
        -0.08457220281787324,
        -0.2812292919473861,
        -0.2458999544821022,
        -0.4620753997410494,
        0.9988693702952457,
        -0.045165044128081,
      ],
    ],
  },
  biasH: {
    rows: 10,
    cols: 1,
    data: [
      [
        -0.002210638601071347,
      ],
      [
        0.31083903297774135,
      ],
      [
        -0.31848091875214746,
      ],
      [
        -0.09805386389639201,
      ],
      [
        0.06446258989354003,
      ],
      [
        -0.00012972681826379614,
      ],
      [
        0.05624867301827521,
      ],
      [
        0.010450082695227464,
      ],
      [
        -0.00827766241229379,
      ],
      [
        -0.030019122464182483,
      ],
    ],
  },
  biasO: {
    rows: 1,
    cols: 1,
    data: [
      [
        0.007783028497830579,
      ],
    ],
  },
  learningRate:       0.1,
  activationFunction: {},
}

