import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { HandleClickContext, IsBlackNextContext, WinnerContext } from '../contexts'

const StyledActiveChess = styled.div`
  position: absolute;
  z-index: 1;
  padding: 1rem;
  border-radius: 50%;

  &:hover {
    background: ${({ square, isBlackNext, winner }) => {
      if(square || winner) return
      return isBlackNext ? '#0008' : '#fff8'
    }};
  }

  background: ${(props) => props.square};

  @media screen and (max-width: 1024px) {
    & {
      padding: 0.75rem;
    }
  }
`

export default function ActiveChess({ square, boardRowIndex, squareIndex }) {
  const isBlackNext = useContext(IsBlackNextContext)
  const handleClick = useContext(HandleClickContext)
  const winner = useContext(WinnerContext)
  return (
    <StyledActiveChess
      square={square}
      onClick={() => handleClick(boardRowIndex, squareIndex)}
      isBlackNext={isBlackNext}
      winner={winner}
    />
  )
}

ActiveChess.propTypes = {
  square: PropTypes.oneOf([
    null,
    'black',
    'white'
  ]),
  boardRowIndex: PropTypes.number,
  squareIndex: PropTypes.number
}