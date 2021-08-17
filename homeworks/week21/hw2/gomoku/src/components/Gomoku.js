import { useEffect, useState } from 'react'
import Board from './Board'
import styled from 'styled-components'

export const BOARD_WIDTH = 19
export const BOARD_HEIGHT = 19

const StyledGomoku = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 2rem;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`

const Header = styled.div`
  text-align: center;
`

const Title = styled.h1`
  font-size: 3rem
`

const Subtitle = styled.h2`
  font-size: 2rem;
`

const Info = styled.div``

const Status = styled.div`
  width: 15rem;
  font-size: 1.5rem;
  text-transform: capitalize;
`

const initSquares = []
for(let i = 0; i < BOARD_HEIGHT; i++) {
  const row = []
  for(let j = 0; j < BOARD_WIDTH; j++) {
    row.push(null)
  }
  initSquares.push(row)
}

export default function Gomoku() {
  const [history, setHistory] = useState([{
    squares: initSquares
  }])
  const [isBlackNext, setIsBlackNext] = useState(true)
  const [status, setStatus] = useState('')
  const [winner, setWinner] = useState('')
  const [round, setRound] = useState(0)

  const current = history[round].squares

  const jumpTo = (step) => {
    return () => {
      setRound(step)
      setIsBlackNext(!(step % 2))
      setWinner('')
    }
  }

  const moves = history.map((move, step) => {
    const description = step ?
      `Go to Move ${step}` :
      `Go to Game Start`
    return (
      <li key={step}>
        <button onClick={jumpTo(step)}>{description}</button>
      </li>
    )
  })

  useEffect(() => {
    setStatus(winner ?
      `Winner is: 🎉${winner}🎉` :
      `嗯～下面一位：${isBlackNext ? 'Black' : 'White'}`
    )
  }, [winner, isBlackNext])

  const handleClick = (y, x) => {
    return () => {
      if (current[y][x] || winner) return

      const newHistory = JSON.parse(JSON.stringify(history.slice(0, round + 1)))
      const squares = current.slice()
      squares[y][x] = isBlackNext ? 'black' : 'white'
      setHistory(newHistory.concat([{
        squares
      }]))
      setIsBlackNext(!isBlackNext)
      setRound(newHistory.length)
      setWinner(calculateWinner(squares, y, x) ? squares[y][x] : '')
    }
  }

  return (
    <StyledGomoku>
      <Main>
        <Header>
          <Title>五子棋</Title>
          <Subtitle>Gomoku</Subtitle>
        </Header>
        <Board squares={current} onClick={handleClick} />
      </Main>
      <Info>
        <Status>
          {status}
        </Status>
        <ol>{moves}</ol>
      </Info>
    </StyledGomoku>
  )
}

const calculateWinner = (squares, y, x) => {
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

  while(squares[tempY][tempX] === targetColor) {
    total++
    tempX += directionX
    tempY += directionY
  }

  return total
}
