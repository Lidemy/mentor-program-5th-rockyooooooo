import { useState } from 'react'
import styled from 'styled-components'
import Board from './Board'
import TimeTravel from './TimeTravel'
import { calculateWinner } from '../utils'
import { HandleClickContext, IsBlackNextContext, WinnerContext } from '../contexts'

export const BOARD_WIDTH = 19
export const BOARD_HEIGHT = 19

const StyledGomoku = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 2rem;

  @media screen and (max-width: 900px) {
    & {
      flex-direction: column;
      height: auto;
    }
  }
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-width: 494px;
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
  margin-top: 9rem;

  @media screen and (max-width: 900px) {
    & {
      margin-top: 1rem;
    }
  }
`

const Status = styled.div`
  width: 20rem;
  font-size: 1.5rem;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
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
  const [history, setHistory] = useState(() => [{
    squares: initSquares
  }])
  const [isBlackNext, setIsBlackNext] = useState(true)
  const [winner, setWinner] = useState('')
  const [round, setRound] = useState(0)

  const status = winner ?
  `Winner is: 🎉${winner}🎉` :
  `Next is：${isBlackNext ? 'Black' : 'White'}`

  const current = history[round].squares

  const handleClick = (y, x) => {
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

  return (
    <StyledGomoku>
      <Main>
        <Header>
          <Title>五子棋</Title>
          <Subtitle>Gomoku</Subtitle>
        </Header>
        <IsBlackNextContext.Provider value={isBlackNext}>
          <HandleClickContext.Provider value={handleClick}>
            <WinnerContext.Provider value={winner}>
              <Board squares={current} />
            </WinnerContext.Provider>
          </HandleClickContext.Provider>
        </IsBlackNextContext.Provider>
      </Main>
      <Info>
        <Status>{status}</Status>
        <TimeTravel history={history} setRound={setRound} setWinner={setWinner} setIsBlackNext={setIsBlackNext} />
      </Info>
    </StyledGomoku>
  )
}
