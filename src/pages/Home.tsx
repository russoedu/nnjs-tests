import { Container, Grid, Paper, styled } from '@mui/material'
import { Link } from 'react-router-dom'
import './Home.css'

export function Home () {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding:         theme.spacing(1),
    textAlign:       'center',
    color:           theme.palette.text.secondary,
    height:          '100%',
  }))

  const items = [
    {
      title:       'Divider',
      link:        'divider',
      description: 'divides a plane in two and classify the points using a single Perceptron',
    },
    {
      title:       'XOR',
      link:        'xor',
      description: 'XOR visualisation using the created Neural Network',
    },
    {
      title:       'Contrast',
      link:        'contrast',
      description: 'Color contrast with Neural Network.',
      alert:       'Contains fast flashing images that may trigger seizures',
    },
    {
      title:       'Doodle Visualiser',
      link:        'doodle-view',
      description: 'View the doodles database used to train the doodle classifier.',
    },
    {
      title:       'Doodle Classifier',
      link:        'doodle-classifier',
      description: 'Draw an image and let the NN classify.',
    },
    {
      title:       'Colour Classifier',
      link:        'colour-classifier',
      description: 'Colour classification with TensorFlow.',
    },
    {
      title:       'Flappy Bird',
      link:        'flappy-bird',
      description: 'Flappy Bird clone.',
    },
    {
      title:       'Training Bird',
      link:        'training-bird',
      description: 'Flappy Bird neural network training.',
    },
    {
      title:       'Smarty Bird',
      link:        'smarty-bird',
      description: 'Already trained neural network that plays Flappy Bird .',
    },
  ]

  return (
    <Container className='container'>
      <h1>Neural Network JavaScript Tests</h1>
      <p>A playground with some neural network tests.</p>
      <Grid container spacing={2} alignItems="stretch">
        {items.map(item => (
          <Grid item xs={3} key={item.link} alignSelf="stretch">
            <Link to={item.link}>
              <Item className='main-item'>
                <h3>
                  {item.title}
                </h3>
                <p>{item.description}</p>
                {item.alert
                  ? <h5>⚠️{item.alert}</h5>
                  : <></>
                }
              </Item>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
