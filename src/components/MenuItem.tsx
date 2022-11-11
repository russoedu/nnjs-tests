import { Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { Link } from "react-router-dom";

export function MenuItem ({ sx }: { sx?: SxProps<Theme>}) {
  return(
    <Typography
      className='navbar-item logo'
      variant='h5'
      noWrap
      component='div'
      sx={sx}
    >
      <Link to='/'>
        <img src="/font-color-contrast-logo.svg" alt="logo" />
        <div>font-color-contrast</div>
      </Link>
    </Typography>
  )
}
