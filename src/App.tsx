import { createTheme, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import fontColorContrast from 'font-color-contrast'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { ColourClassifier } from './pages/ColourClassifier'
import { ColourContrast } from './pages/ColourContrast'
import { Divider } from './pages/Divider'
import { DoodleClassifier } from './pages/DoodleClassifier'
import { DoodleVisualiser } from './pages/DoodleVisualiser'
import { FlappyBird } from './pages/FlappyBird'
import { Home } from './pages/Home'
import { XOR } from './pages/XOR'

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
            <Route path='/' element={<Home/>}/>
            <Route path='/divider' element={<Divider/>}/>
            <Route path='/xor' element={<XOR/>}/>
            <Route path='/contrast' element={<ColourContrast/>}/>
            <Route path='/doodle-view' element={<DoodleVisualiser/>}/>
            <Route path='/doodle-classifier' element={<DoodleClassifier/>}/>
            <Route path='/colour-classifier' element={<ColourClassifier/>}/>
            <Route path='/flappy-bird' element={<FlappyBird/>}/>
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  )
}
