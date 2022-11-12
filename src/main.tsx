import { createTheme, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import fontColorContrast from 'font-color-contrast'
import ReactDOM from 'react-dom'
import { App } from './App'
import './main.css'

const theme = createTheme({
  palette: {
    getContrastText: fontColorContrast,
    primary: {
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

const page = (
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <App />
    </CssBaseline>
  </ThemeProvider>
)

ReactDOM.render(page, document.getElementById('root')
);
