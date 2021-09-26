import styled from 'styled-components'
import Button from './Button'
import PropTypes from 'prop-types'

const TodosFilterItem = styled.div`
display: flex;
justify-content: space-between;
`
const FilterButton = styled(Button)`
flex: 1;
`

export default function TodosFilter({ setFilter }) {
  const handleTodosFilterToggle = (filter) => {
    return () => setFilter(filter)
  }

  return (
    <TodosFilterItem>
      <FilterButton onClick={handleTodosFilterToggle(null)}>全部</FilterButton>
      <FilterButton onClick={handleTodosFilterToggle(true)}>未完成</FilterButton>
      <FilterButton onClick={handleTodosFilterToggle(false)}>已完成</FilterButton>
    </TodosFilterItem>
  )
}

TodosFilter.propTypes = {
  filter: PropTypes.oneOf([null, true, false]),
  setFilter: PropTypes.func.isRequired
}
