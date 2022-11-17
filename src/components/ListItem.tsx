import { ListItem as LI, ListItemButton, ListItemText, Typography } from '@mui/material'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import './ListItem.css'

export function ListItem ({ title, description, link }: {title: string, description: string, link: string }) {
  return <LI sx={{ width: '100%' }}>
    <Link to={link} className='list-item'><ListItemButton>
      <ListItemText
        sx={{ width: '100%' }}
        primary={title}
        secondary={
          <Fragment>
            <Typography
              sx={{ display: 'inline', width: '100%' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {description}
            </Typography>
          </Fragment>
        }
      />
    </ListItemButton>
    </Link>
  </LI>
}
