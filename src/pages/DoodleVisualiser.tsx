import { CircularProgress, Container, Grid, Input, MenuItem, Paper, Select, SelectChangeEvent, Slider } from '@mui/material'
import { useEffect, useState } from 'react'
import { Doodle } from '../modules/types'
import { NumPyToArray } from '../modules/NumPyToArray'

type NumPyArrayData = { doodle: Doodle, data: NumPyToArray }
export function DoodleVisualiser () {
  const [img, setImg] = useState('')
  const [imgData, setImgData] = useState({} as NumPyToArray)
  const [total, setTotal] = useState(0)

  const [data, setData] = useState([{ doodle: Doodle.EMPTY as Doodle, data: {} }] as NumPyArrayData[])
  const [selectedDoodleType, setSelectedDoodleType] = useState(0)
  const [selectedDoodle, setSelectedDoodle] = useState(0)

  function setSelection (numPyArray: NumPyArrayData) {
    setImgData(numPyArray.data)
    setTotal(numPyArray.data.total)

    const data = numPyArray.data.image(0)
    setImg(data)
    setSelectedDoodle(0)
  }
  function handleSliderChange (_event: Event, newValue: number|number[]) {
    const img = imgData.image(newValue as number)
    setSelectedDoodle(newValue as number)
    setImg(img)
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (value < total) {
      const img = imgData.image(value)
      setSelectedDoodle(value)
      setImg(img)
    } else {
      setSelectedDoodle(total - 1)
    }
  }
  function handleDoodleSelection (event: SelectChangeEvent) {
    const value = Number(event.target.value)
    setSelectedDoodleType(value)
    setSelection(data[value])

  }
  useEffect(() => {
    NumPyToArray.fromUrls(Object.keys(Doodle) as (keyof typeof Doodle)[])
      .then(numPyArrays => {
        setData(numPyArrays)
        setSelectedDoodleType(0)

        setSelection(numPyArrays[0])
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (
    <Container className='canvas-container'>
      <Paper className='canvas-paper' elevation={3} sx={{ width: 1200, textAlign: 'center' }}>
        {img === ''
          ? <div>
            <CircularProgress />
            <h1>Loading doodles</h1>
          </div>
          : <Grid container spacing={2}>
            <Grid item xs={4}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={String(selectedDoodleType)}
                label="Age"
                onChange={handleDoodleSelection}
              >
                {data.map((d, i) => (
                  <MenuItem key={'doodle' + i} value={i}>{d.doodle}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={8} sx={{ imageRendering: 'pixelated' }}>
              <img width={28 * 3} alt="test" src={img} />
            </Grid>
            <Grid item xs={12}>
              <Slider
                min={0} max={total - 1}
                value={selectedDoodle}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
              />
              <Input
                value={selectedDoodle}
                size="small"
                onChange={handleInputChange}
                inputProps={{
                  step:              1,
                  min:               0,
                  max:               total - 1,
                  type:              'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </Grid>
          </Grid>
        }
      </Paper>
    </Container>)
}
