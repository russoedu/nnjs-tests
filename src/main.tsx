import { createTheme, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import fontColorContrast from 'font-color-contrast'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Divider } from './pages/Divider'
import { Home } from './pages/Home'
import { MultilayerPerceptron } from './pages/MultilayerPerceptron'

import './main.css'

const theme = createTheme({
  palette: {
    getContrastText: fontColorContrast,
    primary:         {
      main: '#F5612A',
    },
    secondary: {
      main: '#3850F2',
    },
    error: {
      main: '#d64161',
    },
    warning: {
      main: '#ff7b25',
    },
  },
})

const container = document.getElementById('app')
if (container) {
  const root = createRoot(container)

  root.render(
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route
              path='/'
              element={<Home/>}
            />
            <Route
              path='/divider'
              element={<Divider/>}
            />
            <Route
              path='/multilayer-perceptron'
              element={<MultilayerPerceptron/>}
            />
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  )
}
