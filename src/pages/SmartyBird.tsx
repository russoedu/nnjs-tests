import p5 from 'p5'
import { Container, Paper } from '@mui/material'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
import { Bird } from '../modules/Bird'
import { Pipe } from '../modules/Pipe'
import { BirdBrain } from '../modules/BirdBrain'
import { NeuralNetwork } from '../modules/NeuralNetwork'


export function SmartyBird () {
  const PARALLAX = 0.1
  const PIPES_SPEED = 3 // 4 or less or not possible with this gravity
  const PIPES_GAP = 180

  let bird: Bird
  let birdBrain: BirdBrain

  let pipes: Pipe[] = []
  let score = 0
  let maxScore = 0
  let bgX = 0
  let isOver = false

  let pipeBodySprite: p5.Image
  let pipePeakSprite: p5.Image
  let birdSprites: p5.Image[]
  let bgImg: p5.Image


  function sketch (p: P5CanvasInstance) {
    p.preload = () => {
      pipeBodySprite = p.loadImage('flappy-bird/pipe.svg')
      pipePeakSprite = p.loadImage('flappy-bird/pipe.svg')
      birdSprites = [
        p.loadImage('flappy-bird/rocket-frame-0.svg'),
        p.loadImage('flappy-bird/rocket-frame-1.svg'),
      ]
      bgImg = p.loadImage('flappy-bird/background.png')
    }
    p.setup = () => {
      p.createCanvas(800, 600)
      reset()
    }

    p.keyPressed = () => {
      if (p.key === ' ') {
        reset() //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.
      }
    }

    p.touchStarted = () => {
      if (isOver) reset()
    }

    p.draw = () => {
      p.background(0)
      birdBrain.think(pipes)
      // Draw our background image, then move it at the same speed as the pipes
      p.image(bgImg, bgX, 0, bgImg.width, p.height)
      bgX -= pipes[0].speed * PARALLAX

      /*
       * this handles the "infinite loop" by checking if the right
       * edge of the image would be on the screen, if it is draw a
       * second copy of the image right next to it
       * once the second image gets to the 0 point, we can reset bgX to
       * 0 and go back to drawing just one image.
       */
      if (bgX <= -bgImg.width + p.width) {
        p.image(bgImg, bgX + bgImg.width, 0, bgImg.width, p.height)
        if (bgX <= -bgImg.width) {
          bgX = 0
        }
      }

      for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update()
        pipes[i].show()

        if (pipes[i].pass(bird)) {
          score++
        }

        if (pipes[i].hits(bird)) {
          gameOver()
        }

        if (pipes[i].offscreen()) {
          pipes.splice(i, 1)
        }
      }

      bird.update()
      bird.show()

      pipes.forEach(pipe => {
        if (pipe.getNewPipe) {
          pipes.push(new Pipe(p, pipeBodySprite, pipePeakSprite, PIPES_SPEED, PIPES_GAP))
        }
      })

      showScores()
    }

    function showScores () {
      p.textSize(32)
      p.text('score: ' + score, 1, 32)
      p.text('record: ' + maxScore, 1, 64)
    }

    function gameOver () {
      p.textSize(64)
      p.textAlign(p.CENTER, p.CENTER)
      p.text('GAMEOVER', p.width / 2, p.height / 2)
      p.textSize(35)
      p.text('press SPACE to restart', p.width / 2, p.height / 2 + 42)
      p.textAlign(p.LEFT, p.BASELINE)
      maxScore = p.max(score, maxScore)
      isOver = true
      p.noLoop()
    }

    function reset () {
      isOver = false
      score = 0
      bgX = 0
      pipes = [new Pipe(p, pipeBodySprite, pipePeakSprite, PIPES_SPEED, PIPES_GAP)]
      bird = new Bird(p, birdSprites)
      const brain = NeuralNetwork.deserialize(smartBird)
      birdBrain = new BirdBrain(p, bird, brain)

      p.loop()
    }
  }

  return (
    <Container className='canvas-container'>
      <Paper className='canvas-paper' elevation={3}>
        <ReactP5Wrapper className='canvas' sketch={sketch}/>
      </Paper>
    </Container>
  )
}


export const smartBird = {
  inputNodes:  4,
  hiddenNodes: 14,
  outputNodes: 1,
  weightsIH:   {
    rows: 14,
    cols: 4,
    data: [
      [
        0.22358223071060923,
        0.2134860835534691,
        -0.6828846490428302,
        0.8193086042155651,
      ],
      [
        -0.3307324444075186,
        -0.004939613704086021,
        -0.9910757133590153,
        0.3225168801810874,
      ],
      [
        -0.5306204366765885,
        0.35890632185493576,
        -0.4608405037747594,
        0.6304512547844432,
      ],
      [
        -0.3995700241825304,
        -0.29199772424231574,
        0.22380746423914522,
        0.9766703203550238,
      ],
      [
        -0.545743857033568,
        0.03457981655048803,
        -0.9265275679650764,
        0.4004979713693766,
      ],
      [
        0.5752302292001841,
        -0.7247337458195289,
        -0.2801814761706045,
        -0.33900662184262753,
      ],
      [
        -0.8766527106574604,
        0.9917854421083905,
        -0.7478740648408255,
        0.2810627196987703,
      ],
      [
        -0.42849068846039673,
        0.8981311546355091,
        -0.013409907369208884,
        0.07672596483845862,
      ],
      [
        0.20662270291488039,
        -0.8232364607954827,
        0.49302153642109436,
        0.2661988843828813,
      ],
      [
        -0.6645361855846845,
        -0.25898937300508384,
        0.9072421789521279,
        -0.14146786265393452,
      ],
      [
        -0.9071184227681597,
        0.9193037931559975,
        -0.7063758709802719,
        0.5221772369990649,
      ],
      [
        0.5307846411141992,
        0.942656987865337,
        -0.725944257994739,
        0.5401137160320979,
      ],
      [
        0.43714220985574315,
        -0.6662654053584816,
        0.4759240463929042,
        0.7342897262510251,
      ],
      [
        -0.00552261956067257,
        -0.5155180425284098,
        0.008338392106721937,
        0.9016867396153079,
      ],
    ],
  },
  weightsHO: {
    rows: 1,
    cols: 14,
    data: [
      [
        -0.16623733121460083,
        0.9085868425831123,
        0.015732315339470837,
        0.9171479969889855,
        -0.8574303636810829,
        0.41435487784935887,
        -0.36531401607822733,
        0.6635170437899252,
        0.015309337667209544,
        -0.9835840845397512,
        -0.9908586714608374,
        0.8414799948513672,
        -0.8128416562297169,
        -0.6358137551122574,
      ],
    ],
  },
  biasH: {
    rows: 14,
    cols: 1,
    data: [
      [
        0.541026827097697,
      ],
      [
        0.7764060578657785,
      ],
      [
        -0.3994003732169338,
      ],
      [
        -0.712704290375882,
      ],
      [
        -0.7720209462269283,
      ],
      [
        -0.08033983747370765,
      ],
      [
        0.07629796989595938,
      ],
      [
        -0.4501355345609257,
      ],
      [
        -0.0951684150342369,
      ],
      [
        -0.7823609873450641,
      ],
      [
        0.5732602192246983,
      ],
      [
        0.7166638458175267,
      ],
      [
        -0.7364978311769277,
      ],
      [
        0.5796413870415491,
      ],
    ],
  },
  biasO: {
    rows: 1,
    cols: 1,
    data: [
      [
        0.1508690051417858,
      ],
    ],
  },
  learningRate:       0.1,
  activationFunction: {},
}
