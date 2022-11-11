import { Container, Paper } from '@mui/material'
import { useState } from 'react'
import './Home.css'



export function Home () {
  const [exampleTab, setExampleTab] = useState('js');

  const handleExampleTabChange = (event: any, newValue: any) => {
    setExampleTab(newValue);
  };
  return (
    <Container className='container'>
      <Paper className='readme' elevation={3}>
        <h1>Neural Network JavaScript Tests</h1>

      </Paper>
    </Container>
  )
}
