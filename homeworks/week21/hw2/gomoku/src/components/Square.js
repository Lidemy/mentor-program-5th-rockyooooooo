import styled from 'styled-components'
import ActiveChess from './ActiveChess'
import { BOARD_WIDTH, BOARD_HEIGHT } from './Gomoku'
import PropTypes from 'prop-types'

const StyledSquare = styled.div`
  background: #d5b092; 
  position: relative;
  display: inline-block;
  border: 1px solid black;
  padding: 1rem;
`

export default function Square({ square, boardRowIndex, squareIndex, handleClick }) {
  return (
    <StyledSquare>
      {
        squareIndex >= BOARD_WIDTH - 1 ||
        boardRowIndex >= BOARD_HEIGHT - 1 ?
        '' :
        <ActiveChess
          square={square}
          boardRowIndex={boardRowIndex}
          squareIndex={squareIndex}
          handleClick={handleClick}
        />
      }
    </StyledSquare>
  )
}

Square.propTypes = {
  square: PropTypes.oneOf([
    null,
    'black',
    'white'
  ]),
  boardRowIndex: PropTypes.number,
  squareIndex: PropTypes.number,
  handleClick: PropTypes.func
}