export const calculateWinner = (squares, y, x) => {
  return countContinuousChess(squares, x, y, 1, 0) + countContinuousChess(squares, x, y, -1, 0) >= 4 ||
    countContinuousChess(squares, x, y, 0, 1) + countContinuousChess(squares, x, y, 0, -1) >=4 ||
    countContinuousChess(squares, x, y, -1, -1) + countContinuousChess(squares, x, y, 1, 1) >=4 ||
    countContinuousChess(squares, x, y, 1, -1) + countContinuousChess(squares, x, y, -1, 1) >=4
}

const countContinuousChess = (squares, currentX, currentY, directionX, directionY) => {
  const targetColor = squares[currentY][currentX]
  let tempX = currentX + directionX
  let tempY = currentY + directionY
  let total = 0

  while(tempX >= 0 && tempY >= 0 && squares[tempY][tempX] === targetColor) {
    total++
    tempX += directionX
    tempY += directionY
  }

  return total
}
