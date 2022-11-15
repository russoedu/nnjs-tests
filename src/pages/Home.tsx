import { Container, Paper } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export function Home () {
  const [exampleTab, setExampleTab] = useState('js')

  const handleExampleTabChange = (event: any, newValue: any) => {
    setExampleTab(newValue)
  }
  return (
    <Container className='container'>
      <Paper className='readme' elevation={3}>
        <h1>Neural Network JavaScript Tests</h1>
        <p>A playground with some neural network tests.</p>
        <h2>Tests</h2>
        <ol>
          <li><Link to='perceptron'>Divider Perceptron - divides a plane in two and classify the points</Link></li>
          <li><Link to='multilayer-perceptron'>Divider Perceptron - divides a plane in two and classify the points</Link></li>
        </ol>
      </Paper>
    </Container>
  )
}
