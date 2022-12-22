import { Box, Grid, Slider } from '@mui/material'
import './Slider.css'

function SliderX ({
  id,
  min,
  max,
  value,
  setValue,
  label,
  colour,
}: {
  id: string,
  className?: string,
  min: number,
  max: number,
  value: number,
  setValue: (React.Dispatch<React.SetStateAction<number>>),
  label: string,
  colour: string
}) {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number)
  }

  return (
    <Box>
      <Grid container spacing={2} alignItems="left">
        <Grid xs={3} sx={{ color: colour }}item>
          {label}
        </Grid>
        <Grid xs={9} item>
          <Slider
            id={id}
            sx={{ color: colour }}
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            min={min}
            max={max}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export { SliderX as Slider }
