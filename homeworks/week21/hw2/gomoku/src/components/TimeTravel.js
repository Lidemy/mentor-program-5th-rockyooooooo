import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledOl = styled.ol`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0 0.25rem;
  height: 50vh;
  overflow: auto;

  @media screen and (max-width: 900px) {
    & {
      flex-direction: row;
      max-height: 10rem;
    }
  }
`

const Button = styled.button`
  border: none;
  background: none;
  padding: 0.25rem;
  cursor: pointer;

  &:hover {
    background: #aaa;
  }
`

export default function TimeTravel({ history, setRound, setWinner, setIsBlackNext }) {
  const jumpTo = (step) => {
    setRound(step)
    setIsBlackNext(!(step % 2))
    setWinner('')
  }

  const moves = history.map((move, step) => {
    const description = step ?
      `Move ${step}` :
      `Restart`
    return (
      <li key={step}>
        <Button onClick={() => jumpTo(step)}>{description}</Button>
      </li>
    )
  })

  return <StyledOl>{moves}</StyledOl>
}

TimeTravel.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      squares: PropTypes.arrayOf(
        PropTypes.oneOf([
          null,
          'black',
          'white'
        ])
      )
    })
  ),
  setRound: PropTypes.func,
  setWinner: PropTypes.func,
  setIsBlackNext: PropTypes.func
}