import { Container, List, Paper } from '@mui/material'
import { ListItem } from '../components/ListItem'
import './Home.css'

export function Home () {
  return (
    <Container className='container'>
      <Paper className='readme' elevation={3}>
        <h1>Neural Network JavaScript Tests</h1>
        <p>A playground with some neural network tests.</p>
        <h2>Tests</h2>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem title='Divider' link='divider' description='divides a plane in two and classify the points using a single Perceptron' />
          <ListItem title='XOR' link='xor' description='XOR visualisation using the created Neural Network' />
          <ListItem title='Contrast' link='contrast' description='Color contrast with Neural Network.' alert='⚠️ Contains fast flashing images that may cause discomfort and trigger seizures for people with photosensitive epilepsy' />
        </List>
      </Paper>
    </Container>
  )
}
