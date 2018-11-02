const lunchpad = require('lunchpad');
const Color = lunchpad.Color;

const ff = require('./lib/floodfillImplementation');
const generateBlankSquare = require('./lib/generateBlankSquare');

lunchpad.initialize().then(launchpad => floodfill(launchpad))

function floodfill(launchpad) {
  let cycles = []

  launchpad.on('input', add)

  function add(x, y) {
    let gens = ff({ x: x, y: y })
    gens.color = Color.getRandomColor()

    cycles.push(gens)
  }

  function animationCycle() {
    setTimeout(animationCycle, 100)

    if (cycles.length === 0) return

    let blank = generateBlankSquare(Color.BLACK)
    cycles.forEach(cycle => {
      let gen = cycle.shift()

      gen.forEach(entry => {
        blank[entry.x][entry.y] = cycle.color
      })
    })

    launchpad.updateBoard(blank)

    cycles = cycles.filter(cycle => cycle.length > 0)
  }

  animationCycle()
}

module.exports = floodfill;