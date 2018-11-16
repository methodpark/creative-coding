function generateBlankSquares (color = null) {
  let squares = []
  for (let x = 0; x < 8; x++) {
      let row = []
      for (let y = 0; y < 8; y++) {
          row.push(color)
      }
      squares.push(row)
  }

  return squares
}

module.exports = generateBlankSquares;