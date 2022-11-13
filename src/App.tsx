import CssBaseline from '@mui/material/CssBaseline'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { MultilayerPerceptron } from './pages/MultilayerPerceptron'
import { Perceptron } from './pages/Perceptron'

export function App () {
  return (
    <HashRouter>
      <CssBaseline>
        <Header></Header>
        <Routes>
          <Route
            path='/'
            element={<Home/>}
          />
          <Route
            path='/perceptron'
            element={<Perceptron/>}
          />
          <Route
            path='/multilayer-perceptron'
            element={<MultilayerPerceptron/>}
          />
        </Routes>
      </CssBaseline>
    </HashRouter>
  )
}
