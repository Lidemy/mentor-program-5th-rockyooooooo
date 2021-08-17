import BoardRow from './BoardRow'
import PropTypes from 'prop-types'

export default function Board({ squares, onClick }) {
  return (
    <div>
      {squares.map((row, index) => {
        return (
          <BoardRow
            key={`rowKey${index}`}
            row={row}
            boardRowIndex={index}
            onClick={onClick} 
          />
        )
      })}
    </div>
  )
}

Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOf([
        null,
        'black',
        'white'
      ])
    )
  ),
  onClick: PropTypes.func
}