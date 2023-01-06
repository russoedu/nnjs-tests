import { Container, Paper } from '@mui/material'
import p5 from 'p5'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
import { Bird } from '../modules/Bird'
import { BirdBrain } from '../modules/BirdBrain'
import { NeuralNetwork } from '../modules/NeuralNetwork'
import { Pipe } from '../modules/Pipe'


export function SmartyBird () {
  const PARALLAX = 0.1
  const PIPES_SPEED = 3.51
  const PIPES_GAP = 125

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


const smartBird = {
  inputNodes:  5,
  hiddenNodes: 10,
  outputNodes: 1,
  weightsIH:   {
    rows: 10,
    cols: 5,
    data: [
      [
        -0.26589031318186096,
        -0.05650062873186408,
        0.0018659152640072294,
        -0.026057140766790266,
        -0.0065503558849816955,
      ],
      [
        -0.13426391129028833,
        -0.9655414108950675,
        -0.303218192954104,
        0.2010685483894271,
        0.3537894624445705,
      ],
      [
        -0.06182700162885105,
        -0.007779609064947521,
        -0.0001855853733876296,
        -0.0681668368130322,
        0.11299517481552912,
      ],
      [
        0.6129106137839673,
        0.1210267124658026,
        0.19822128272684797,
        -0.003990874581568729,
        0.27367019972340123,
      ],
      [
        0.03739997754951652,
        0.00886063874386883,
        0.10496580866977048,
        -0.007251539551310212,
        -0.06521444777129497,
      ],
      [
        0.30155797527290423,
        -0.024314458563575867,
        -0.0011545488148255705,
        0.011109273202491063,
        0.0030313145059298386,
      ],
      [
        -0.6096712050032631,
        -0.07154202841672466,
        0.18174695298555707,
        0.1394986264957456,
        -0.027757441574075774,
      ],
      [
        -0.00485821920827221,
        -0.43169312212272104,
        0.07285509390926515,
        -0.18337726095750118,
        0.009862821481185844,
      ],
      [
        0.15523002619204254,
        -0.004489660688510361,
        0.6423355760783033,
        -0.16833349638889686,
        0.012844792276690678,
      ],
      [
        -0.011265880604812437,
        0.8327356164414199,
        -0.24537983886070883,
        -0.03257144736367136,
        -0.00706964010037632,
      ],
    ],
  },
  weightsHO: {
    rows: 1,
    cols: 10,
    data: [
      [
        -0.03119686744219481,
        0.012251652846930937,
        -0.04956893312459838,
        0.027469132753848418,
        0.7920888715462584,
        0.31029158640636173,
        -0.5261487500122999,
        0.09553496031942903,
        -0.6039897170971051,
        0.010672963273483164,
      ],
    ],
  },
  biasH: {
    rows: 10,
    cols: 1,
    data: [
      [
        0.15324830607370923,
      ],
      [
        -0.08421701835550208,
      ],
      [
        -0.010540748296115624,
      ],
      [
        0.0026243393615166867,
      ],
      [
        -0.027656311516813012,
      ],
      [
        -0.019696663936337233,
      ],
      [
        -0.2503708586515353,
      ],
      [
        0.46494376245922203,
      ],
      [
        -0.044673253832050945,
      ],
      [
        -0.10809323068107105,
      ],
    ],
  },
  biasO: {
    rows: 1,
    cols: 1,
    data: [
      [
        -0.0734031020904488,
      ],
    ],
  },
  learningRate:       0.1,
  activationFunction: {},
}

