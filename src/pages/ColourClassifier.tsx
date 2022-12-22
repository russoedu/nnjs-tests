import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Container, Grid, LinearProgress, Modal, Paper, Typography } from '@mui/material'
import * as tf from '@tensorflow/tfjs'
import fontColorContrast from 'font-color-contrast'
import { useEffect, useState } from 'react'
import { ColourCode } from '../components/ColourCode'
import { Slider } from '../components/Slider'
import { colourData } from '../modules/ColourData'
import { colourLabels, Loss, modalStyle } from '../modules/types'
import './ColourClassifier.css'

export function ColourClassifier () {
  const LEARNING_RATE = 0.25
  const TRAINING_EPOCHS = 10
  const [model, setModel] = useState({} as tf.Sequential)

  const [isTraining, setIsTraining] = useState(false)
  const [colour, setColour] = useState('#ff0000')
  const [r, setR] = useState(255)
  const [g, setG] = useState(0)
  const [b, setB] = useState(0)
  const [label, setLabel] = useState('')
  const [fontColour, setFontColour] = useState('#ffffff')
  const [progress, setProgress] = useState(0)
  const [loss, setLoss] = useState(0)

  useEffect(() => {
    colourData.loadData()
    getModel()
  }, [])

  useEffect(() => {
    if (model instanceof tf.Sequential) {
      const c = toHex(r) + toHex(g) + toHex(b)

      setColour(c)
      setFontColour(fontColorContrast(c))
      predict()
    }
  }, [r, g, b])

  /**
   * Creates the TensorFlow Model and retrieves
   * @returns The TensorFlow Model
   */
  function getModel () {
    if (!(model instanceof tf.Sequential)) {
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
    }
  }

  async function train () {
    setIsTraining(true)
    setProgress(0)
    // colourData.shuffle()



    colourData.xs.print()
    colourData.ys.print()
    const fitOptions = {
      epochs:          TRAINING_EPOCHS,
      validationSplit: 0.1,
      shuffle:         true,
      callbacks:       {
        onTrainEnd: () => {
          setIsTraining(false)
        },
        onEpochEnd: (epoch: number, logs: Loss) => {
          const completionPercentage = (epoch + 1) / (TRAINING_EPOCHS / 100)

          setProgress(completionPercentage)
          setLoss(Number(logs.loss.toFixed(5)))
          // colourData.shuffle()
          /*
           * lossY.push(logs.val_loss.toFixed(2))
           * accY.push(logs.loss.toFixed(2))
           * lossX.push(lossX.length + 1)
           */
          // return tf.nextFrame()
        },

        /*
         * onBatchEnd: async (batch, logs) => {
         *   await tf.nextFrame()
         * },
         */
      },
    }
    return model.fit(colourData.xs, colourData.ys, fitOptions as any)
  }

  function predict () {
    if (model instanceof tf.Sequential) {
      setFontColour(fontColorContrast(colour))

      tf.tidy(() => {
        const input = tf.tensor2d([[r / 255, g / 255, b / 255]])

        const results: tf.Tensor = model.predict(input) as any
        input.print()
        results.print()

        const argMax = results.argMax(1)
        const index = argMax.dataSync()[0]

        setLabel(colourLabels[index])
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
                  backgroundColor: `#${colour}`,
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
              className='cp-demo-bg cp-container-item'
              elevation={3}
            >
              <div id='graph-Container'>
                <div id='loss'>Loss: {loss}</div>
                <div id='loss'>Prediction: {label}</div>
                <div id='graph'></div>
              </div>
              <Button id='train' onClick={train} className='btn'>Start Training</Button>
              <div className='load-Save'>
                <p><b>Note:</b> When saving a model, the topology and weights will be saved to your browsers <code>indexedDB</code> storage</p>
                <button id='load' className='btn'>Load Model</button>
                <button id='save' className='btn'>Save Model</button>
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
      open={isTraining}
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
