const debug = require('debug');
const lunchpad = require('lunchpad');
const Color = lunchpad.Color;

const generateBlankSquare = require('../lib/generateBlankSquare');

const DIR_UP = 'up'
const DIR_DOWN = 'down'
const DIR_LEFT = 'left'
const DIR_RIGHT = 'right'

const STATE_START = 'start'
const STATE_RUNNING = 'running'
const STATE_ERROR = 'error'

const GRID_SIZE = 8

lunchpad.initialize().then(launchpad => snake(launchpad))

function snake(launchpad) {
  let state = STATE_START, currentDirection, snake, apple, delay
  let _debug = debug('lp:snake')

  function initiate() {
    state = STATE_RUNNING
    currentDirection = DIR_DOWN
    snake = [Object.assign(_getRandomCoord(), { c: Color.AMBER })]
    apple = createApple()
    delay = 500
    tick()
  }

  function handleError() {
    state = STATE_ERROR

    launchpad.updateBoard(generateBlankSquare(Color.RED))
    setTimeout(() => launchpad.updateBoard(generateBlankSquare(Color.BLACK)), 400)
    setTimeout(() => launchpad.updateBoard(generateBlankSquare(Color.RED)), 800)
    setTimeout(() => launchpad.updateBoard(generateBlankSquare(Color.BLACK)), 1200)
  }

  function normalize(value){
    if (value < 0) {
      return GRID_SIZE - 1;
    } else if (value >= GRID_SIZE) {
      return 0;
    }
    return value;
  }

  function tick() {
    let nextSquare = null
    switch (currentDirection) {
      case DIR_UP:
        nextSquare = { x: snake[0].x, y: normalize(snake[0].y + 1) }
        break
      case DIR_DOWN:
        nextSquare = { x: snake[0].x, y: normalize(snake[0].y - 1) }
        break
      case DIR_LEFT:
        nextSquare = { x: normalize(snake[0].x - 1), y: snake[0].y }
        break
      case DIR_RIGHT:
        nextSquare = { x: normalize(snake[0].x + 1), y: snake[0].y }
        break
    }

    //check for snek collision
    if (_checkSnakeForCollision(snake, nextSquare)) {
      handleError()
      return
    }

    let shouldShift = true
    //check for apple collision
    if (nextSquare.x === apple.x && nextSquare.y === apple.y) {
      apple = createApple()
      shouldShift = false
      delay -= 10
      delay = Math.max(delay, 150)

      _debug('apple!', delay)
    }

    let c = null
    do {
      c = Color.getRandomColor()
    } while (c.getCode() === 0)
    nextSquare.c = c

    snake.unshift(nextSquare)
    if (shouldShift) {
      snake.pop()
    }

    print()
    setTimeout(tick, delay)
  }

  function print() {
    let blank = generateBlankSquare(Color.BLACK)

    snake.forEach((entry, i) => blank[entry.x][entry.y] = entry.c)

    blank[apple.x][apple.y] = Color.RED

    launchpad.updateBoard(blank)
  }

  function createApple() {
    let apple = null
    do {
      apple = _getRandomCoord()
    } while (_checkSnakeForCollision(snake, apple))

    return apple
  }

  launchpad
    .on('functionY', y => {
      if (state === STATE_ERROR || state === STATE_START) return initiate()

      if (y === 0 && currentDirection !== DIR_UP) { //down
        _debug('down')
        currentDirection = DIR_DOWN
      } else if (y === 1 && currentDirection !== DIR_DOWN) {//up
        _debug('up')
        currentDirection = DIR_UP
      }
    })
    .on('functionX', x => {
      if (state === STATE_ERROR || state === STATE_START) return initiate()

      if (x === 0 && currentDirection !== DIR_RIGHT) { //left
        _debug('left')
        currentDirection = DIR_LEFT
      } else if (x === 1 && currentDirection !== DIR_LEFT) { //right
        _debug('right')
        currentDirection = DIR_RIGHT
      }
    })

  launchpad
    .setFunctionY(0, Color.getColor(1, 1))
    .setFunctionY(1, Color.getColor(1, 1))
    .setFunctionX(0, Color.getColor(1, 1))
    .setFunctionX(1, Color.getColor(1, 1))
}

function _getRandomCoord() {
  return { x: parseInt(Math.random() * GRID_SIZE), y: parseInt(Math.random() * GRID_SIZE) }
}

function _checkSnakeForCollision(snake, coord) {
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === coord.x && snake[i].y === coord.y) {
      return true
    }
  }

  return false
}

module.exports = snake;
