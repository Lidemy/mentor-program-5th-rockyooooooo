import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledActiveChess = styled.div`
  position: absolute;
  z-index: 1;
  padding: 1rem;
  border-radius: 50%;

  background: ${(props) => {
    return props.square === 'black' ?
    '#000' :
    props.square === 'white' ?
    '#fff' :
    'transparent'
  }}
`

export default function ActiveChess({ square, boardRowIndex, squareIndex, handleClick }) {
  return (
    <StyledActiveChess
      square={square}
      onClick={handleClick(boardRowIndex, squareIndex)}
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
  squareIndex: PropTypes.number,
  handleClick: PropTypes.func
}