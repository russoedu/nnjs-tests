import { Button } from "@mui/material";
import './ViewOnButton.css'

export function ViewOnButton ({ url, text, icon }: {
  url: string,
  text: string,
  icon: any,
 }) {
  return (
    <>
      <Button
        className='vob-get-links'
        color='secondary'
        variant='contained'
        sx={{ display: { lg: 'flex', xs: 'none' } }}
        endIcon={icon}
        href={url}
        target='_blank'
        rel='noreferrer'
      >
        {text}
      </Button>
      <Button
        className='vob-get-links vob-get-links-compact'
        color='secondary'
        variant='contained'
        sx={{ display: { md: 'flex', lg: 'none' }, paddingRight: '10px' }}
      >
        <span className='vob-get-links-icon'>
          {icon}
        </span>
      </Button>
    </>
  )
}
