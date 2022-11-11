import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Perceptron } from './pages/Perceptron'
import { Home } from './pages/Home'
import CssBaseline from '@mui/material/CssBaseline'
import './App.css'

export function App() {
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
        </Routes>
      </CssBaseline>
    </HashRouter>
  )
}
