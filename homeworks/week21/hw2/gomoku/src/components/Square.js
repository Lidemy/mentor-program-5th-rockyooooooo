import styled from 'styled-components'
import ActiveChess from './ActiveChess'
import { BOARD_WIDTH, BOARD_HEIGHT } from './Gomoku'
import PropTypes from 'prop-types'

const StyledSquare = styled.div`
  background: #d5b092;
  position: relative;
  display: inline-block;
  border: 1px solid white;
  padding: 1rem;

  @media screen and (max-width: 1024px) {
    & {
      padding: 0.75rem;
    }
  }
`

export default function Square({ square, boardRowIndex, squareIndex }) {
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
  squareIndex: PropTypes.number
}