import { AppBar, Box, Button, ButtonGroup, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './Header.css'
import { FaBars, FaNpm } from 'react-icons/fa'
import { GoMarkGithub } from 'react-icons/go'
import { useState } from 'react'
import { Logo } from './Logo'
import { ViewOnButton } from './ViewOnButton'

const pages = [
  { name: 'Perceptron', link: '/perceptron' },
]

export function Header () {

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }


  return (
    <AppBar position='sticky' enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'start', display: 'flex' }}>
          <Logo sx={{ mr: 2 }} />

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={page.link} key={page.name}>
                <Button
                  key={page.name}
                  sx={{ my: 2, display: 'block' }}
                  color='secondary'
                >
                  <Typography textAlign="center">
                    {page.name}
                  </Typography>
                </Button>
              </Link>
            ))}
          </Box>

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
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={page.link}>
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
