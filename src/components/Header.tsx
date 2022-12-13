import { AppBar, Box, ButtonGroup, Container, IconButton, Menu, Toolbar } from '@mui/material'
import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { GoMarkGithub } from 'react-icons/go'
import './Header.css'
import { Logo } from './Logo'
import { ViewOnButton } from './ViewOnButton'

export function Header () {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position='sticky' enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'start', display: 'flex' }}>
          <Logo sx={{ mr: 2 }} />

          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <ButtonGroup variant="contained" sx={{ marginLeft: '1em' }}>
              <ViewOnButton
                url='https://github.com/russoedu/nnjs-tests'
                text='view on GitHub'
                icon={<GoMarkGithub />}
              />
            </ButtonGroup>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <FaBars />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical:   'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical:   'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
