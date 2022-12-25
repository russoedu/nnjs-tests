import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Container, Grid, LinearProgress, Modal, Paper, Typography } from '@mui/material'
import * as tf from '@tensorflow/tfjs'
import fontColorContrast from 'font-color-contrast'
import { useEffect, useState } from 'react'
import { ColourCode } from '../components/ColourCode'
import { Slider } from '../components/Slider'
import { colourData } from '../modules/ColourData'
import { colourLabels, colourLabelsColour, Loss, modalStyle, TrainingStatus } from '../modules/types'
import './ColourClassifier.css'

export function ColourClassifier () {
  const LEARNING_RATE = 0.25
  const TRAINING_EPOCHS = 30
  const [model, setModel] = useState({} as tf.Sequential)

  const [trainingStatus, setTrainingStatus] = useState(TrainingStatus.LOADING_DATA)
  const [colour, setColour] = useState('#ff0000')
  const [r, setR] = useState(255)
  const [g, setG] = useState(0)
  const [b, setB] = useState(0)
  const [fontColour, setFontColour] = useState('#ffffff')
  const [progress, setProgress] = useState(0)
  const [loss, setLoss] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [label, setLabel] = useState('red-ish')
  const [labelColour, setLabelColour] = useState('#ff0000')

  useEffect(() => {
    colourData
      .loadData()
      .then(() => {
        setTfModel()
      })
  }, [])

  useEffect(() => {
    if (trainingStatus === TrainingStatus.MODEL_SET) {
      train()
    }
    /*
     *  else if (trainingStatus === TrainingStatus.LOADING_DATA) {
     *   setTrainingStatus(TrainingStatus.MODEL_SET)
     * }
     */
  }, [model])


  useEffect(() => {
    const c = toHexColour(r, g, b)

    setColour(c)
    setFontColour(fontColorContrast(c))
    predict()
  }, [r, g, b])

  async function train () {
    setTrainingStatus(TrainingStatus.TRAINING)
    setProgress(0)
    colourData.shuffle()

    const fitOptions = {
      epochs:          TRAINING_EPOCHS,
      validationSplit: 0.1,
      shuffle:         true,
      callbacks:       {
        onTrainEnd: () => {
          setTrainingStatus(TrainingStatus.TRAINED)
        },
        onEpochEnd: (epoch: number, logs: Loss) => {
          const completionPercentage = (epoch + 1) / (TRAINING_EPOCHS / 100)
          console.log(logs)

          setProgress(completionPercentage)
          setLoss(Number(logs.loss.toFixed(5)))
          setAccuracy(Number(logs.acc.toFixed(5)))
        },
      },
    }
    return model.fit(colourData.xs, colourData.ys, fitOptions as any)
  }

  function setTfModel () {
    if (trainingStatus === TrainingStatus.LOADING_DATA) {
      console.log('model')

      const md = tf.sequential()
      const hidden = tf.layers.dense({
        units:      15,
        inputShape: [3],
        activation: 'sigmoid',
      })

      const output = tf.layers.dense({
        units:      9,
        activation: 'softmax',
      })
      md.add(hidden)
      md.add(output)

      const optimizer = tf.train.sgd(LEARNING_RATE)

      md.compile({
        optimizer: optimizer,
        loss:      'categoricalCrossentropy',
        metrics:   ['accuracy'],
      })

      setModel(md)
      setTrainingStatus(TrainingStatus.MODEL_SET)
    }
  }

  function predict () {
    if (trainingStatus === TrainingStatus.TRAINED) {
      tf.tidy(() => {
        const input = tf.tensor2d([[r / 255, g / 255, b / 255]])

        const results: tf.Tensor = model.predict(input) as any
        const argMax = results.argMax(1)
        const index = argMax.dataSync()[0]

        setLabel(colourLabels[index])
        setLabelColour(colourLabelsColour[index])
      })
    }
  }

  function colourSheet () {
    return <div>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Colours training sheet</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {colourData.sheetData.map(d => {
            return(<div
              key={d.id}
              style={{
                width:           100,
                height:          25,
                backgroundColor: d.backgroundColor,
                float:           'left',
                padding:         '0 5px',
              }}>{d.label}</div>)
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  }

  function toHex (num: number) {
    const txt = Number(num).toString(16).toUpperCase()
    return '0'.repeat(2 - txt.length) + txt
  }

  function toHexColour (red: number, green: number, blue: number) {
    const c = '#' + toHex(red) + toHex(green) + toHex(blue)

    return c
  }

  return <Container className='canvas-container'>
    <Paper className='canvas-paper' elevation={3}>
      <Container className='cp-container'>
        <Grid container spacing={2}>
          <Grid xs={4} item>
            <div className='cp-color-picker cp-container-item'>
              <Slider
                id='slider-red'
                min={0}
                max={255}
                value={r}
                setValue={setR}
                label='red'
                colour='red'
              />
              <Slider
                id='slider-green'
                min={0}
                max={255}
                value={g}
                setValue={setG}
                label='green'
                colour='green'
              />
              <Slider
                id='slider-blue'
                min={0}
                max={255}
                value={b}
                setValue={setB}
                label='blue'
                colour='blue'
              />
              <Card
                className='color-picker-details' style={{
                  backgroundColor: colour,
                  color:           fontColour,
                }}
              >
                <CardContent>
                  <Grid container spacing={2} columns={16}>
                    <Grid item xs={7} sx={{ textAlign: 'right' }}>
                      <Typography>
                  color:
                      </Typography>
                    </Grid>
                    <Grid item xs={9} sx={{ paddingLeft: '0' }}>
                      <span><ColourCode color={colour}/></span>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </div>
          </Grid>
          <Grid xs={8} item>
            <Paper
              className='canvas-paper'
              elevation={3}
            >
              <div id='graph-Container'>
                <div id='loss'>Loss: {loss}</div>
                <div id='loss'>Accuracy: {accuracy}</div>
                <Card
                  className='color-picker-details' style={{
                    backgroundColor: labelColour,
                    color:           fontColorContrast(labelColour),
                  }}
                >
                  <div id='loss'>Prediction: {label}</div>
                </Card>
              </div>
            </Paper>
          </Grid>
          <Grid xs={12} item>
            {colourSheet()}
          </Grid>
        </Grid>
      </Container>
    </Paper>
    <Modal
      open={trainingStatus !== TrainingStatus.TRAINED}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Training Model
        </Typography>
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </Box>
    </Modal>
  </Container>
}
