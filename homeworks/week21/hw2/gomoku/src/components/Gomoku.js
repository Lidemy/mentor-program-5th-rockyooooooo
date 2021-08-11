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

const Info = styled.div`
  width: 15rem;
`

const Status = styled.div`
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
  const [round, setRound] = useState(0)
  const current = history[round].squares

  useEffect(() => {
    const winner = calculateWinner(current)
    setStatus(winner ?
      `Winner is: 🎉${winner}🎉` :
      `嗯～下面一位：${isBlackNext ? 'Black' : 'White'}`
    )
  }, [current, isBlackNext])

  const handleClick = (boardRowIndex, squareIndex) => {
    return () => {
      if (calculateWinner(current)) return

      if (current[boardRowIndex][squareIndex]) return
      const newHistory = history.slice()
      const squares = current.slice()
      squares[boardRowIndex][squareIndex] = isBlackNext ? 'black' : 'white'
      setHistory(newHistory.concat([{
        squares
      }]))
      setIsBlackNext(!isBlackNext)
      setRound(newHistory.length)
    }
  }

  return (
    <StyledGomoku>
      <Main>
        <Header>
          <Title>五子棋</Title>
          <Subtitle>Gomoku</Subtitle>
        </Header>
        <Board squares={current} handleClick={handleClick} />
      </Main>
      <Info>
        <Status>
          {status}
        </Status>
      </Info>
    </StyledGomoku>
  )
}

const calculateWinner = (squares) => {
  const winner = searchRow(squares) || searchColumn(squares) || searchSlash(squares) || searchBackslash(squares)
  return winner
}

const searchRow = (squares) => {
  let current = null
  let count = 1
  for(let i = 0; i < squares.length; i++) {
    for(let j = 0; j < squares[i].length; j++) {
      if (!squares[i][j] || current !== squares[i][j]) {
        current = squares[i][j]
        count = 1
      } else {
        count++
      }

      if (count === 5) return current
    }
  }
  return null
}

const searchColumn = (squares) => {
  let current = null
  let count = 1
  for(let i = 0; i < squares.length; i++) {
    for(let j = 0; j < squares[i].length; j++) {
      if (!squares[j][i] || current !== squares[j][i]) {
        current = squares[j][i]
        count = 1
      } else {
        count++
      }

      if (count === 5) return current
    }
  }
  return null
}

const searchSlash = (squares) => {
  let current = null
  let count = 1
  for(let i = 0; i < squares.length; i++) {
    for(let j = 0; j < squares[i].length; j++) {
      if (!squares[i][j]) {
        current = squares[i][j]
        count = 1
      } else {
        current = squares[i][j]
        for(let k = 1; k < 5; k++) {
          if (current !== squares[i + k][j - k]) {
            count = 1
            break
          }
          count++
        }
      }

      if (count === 5) return current
    }
  }
  return null
}

const searchBackslash = (squares) => {
  let current = null
  let count = 1
  for(let i = 0; i < squares.length; i++) {
    for(let j = 0; j < squares[i].length; j++) {
      if (!squares[i][j]) {
        current = squares[i][j]
        count = 1
      } else {
        current = squares[i][j]
        for(let k = 1; k < 5; k++) {
          if (current !== squares[i + k][j + k]) {
            count = 1
            break
          }
          count++
        }
      }

      if (count === 5) return current
    }
  }
  return null
}
