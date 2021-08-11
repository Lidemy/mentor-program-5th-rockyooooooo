import styled from 'styled-components'
import Square from './Square'
import PropTypes from 'prop-types'

const StyledBoardRow = styled.div`
  margin-bottom: -4px;  // 抵銷奇怪的 margin
`

export default function BoardRow({ row, boardRowIndex, handleClick }) {
  return (
      <StyledBoardRow>
        {row.map((square, index) => {
          return (
            <Square
              key={`squareKey${index}`}
              square={square}
              squareIndex={index}
              boardRowIndex={boardRowIndex}
              handleClick={handleClick}
            />
          )
        })}
      </StyledBoardRow>
  )
}

BoardRow.propTypes = {
  row: PropTypes.arrayOf(
    PropTypes.oneOf([
      null,
      'black',
      'white'
    ])
  ),
  boardRowIndex: PropTypes.number,
  handleClick: PropTypes.func
}