import p5 from 'p5'
import { Container, Paper } from '@mui/material'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
import { Bird } from '../modules/Bird'
import { Pipe } from '../modules/Pipe'


export function FlappyBird () {
  const PARALLAX = 0.1

  let bird: Bird
  let pipes: Pipe[]
  let score = 0
  let maxScore = 0
  let bgX = 0
  let gameOverFrame = 0
  let isOver = false

  let touched = false
  let prevTouched = touched

  let pipeBodySprite: p5.Image
  let pipePeakSprite: p5.Image
  let birdSprite: p5.Image
  let bgImg: p5.Image

  function sketch (p: P5CanvasInstance) {
    p.preload = () => {
      pipeBodySprite = p.loadImage('flappy-bird/pipe_marshmallow_fix.png')
      pipePeakSprite = p.loadImage('flappy-bird/pipe_marshmallow_fix.png')
      birdSprite = p.loadImage('flappy-bird/rocket.png')
      bgImg = p.loadImage('flappy-bird/background.png')
    }
    p.setup = () => {
      p.createCanvas(800, 600)
      reset()
    }

    p.keyPressed = () => {
      if (p.key === ' ') {
        bird.up()
        if (isOver) reset() //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.
      }
    }

    p.touchStarted = () => {
      if (isOver) reset()
    }

    p.draw = () => {
      p.background(0)
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

      if ((p.frameCount - gameOverFrame) % 150 == 0) {
        pipes.push(new Pipe(pipeBodySprite,pipePeakSprite, p))
      }

      showScores()

      /*
       * touches is an list that contains the positions of all
       * current touch points positions and IDs
       * here we check if touches' length is bigger than one
       * and set it to the touched var
       */
      touched = (p.touches.length > 0)

      /*
       * if user has touched then make bird jump
       * also checks if not touched before
       */
      if (touched && !prevTouched) {
        bird.up()
      }

      // updates prevTouched
      prevTouched = touched
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
      p.textAlign(p.LEFT, p.BASELINE)
      maxScore = p.max(score, maxScore)
      isOver = true
      p.noLoop()
    }

    function reset () {
      isOver = false
      score = 0
      bgX = 0
      pipes = []
      bird = new Bird(p.height, p, birdSprite)
      pipes.push(new Pipe(pipeBodySprite,pipePeakSprite, p))
      gameOverFrame = p.frameCount - 1
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
