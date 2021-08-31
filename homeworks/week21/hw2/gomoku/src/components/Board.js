import BoardRow from './BoardRow'
import PropTypes from 'prop-types'

export default function Board({ squares }) {
  return (
    <div>
      {squares.map((row, index) =>
        <BoardRow
          key={`rowKey${index}`}
          row={row}
          boardRowIndex={index}
        />
      )}
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
  )
}