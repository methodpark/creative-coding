const lunchpad = require('lunchpad');
const Color = lunchpad.Color;

lunchpad.initialize().then(launchpad => drawing(launchpad))


function drawing(launchpad) {
  let currentColor = Color.RED

  let definitionRed = Color.RED
  let definitionGreen = Color.GREEN
  let definitionAmber = Color.AMBER

  launchpad
    .on('input', (x, y) => {
      let newColor = currentColor
      if (launchpad.getSquare(x, y).getCode() === newColor.getCode()) {
        newColor = Color.BLACK
      }

      launchpad.setSquare(x, y, newColor)
    })
    .on('functionY', y => {
      if (y === 0) {
        launchpad.clearSquares()
      }
    })
    .on('functionX', x => {
      if (x === 0) {
        currentColor = Color.getColor((definitionRed.getRed() + 1) % 3 + 1, 0)
        definitionRed = currentColor
      } else if (x === 1) {
        currentColor = Color.getColor(0, (definitionGreen.getGreen() + 1) % 3 + 1)
        definitionGreen = currentColor
      } else if (x === 2) {
        currentColor = Color.getColor((definitionAmber.getRed() + 1) % 3 + 1, (definitionAmber.getGreen() + 1) % 3 + 1)
        definitionAmber = currentColor
      } else {
        return
      }

      launchpad.setFunctionX(7, currentColor)
    })
    .setFunctionY(0, Color.RED)
    .setFunctionX(0, Color.RED)
    .setFunctionX(1, Color.GREEN)
    .setFunctionX(2, Color.AMBER)
    .setFunctionX(7, currentColor)
}

module.exports = drawing