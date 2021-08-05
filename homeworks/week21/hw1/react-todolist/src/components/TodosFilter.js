import styled from 'styled-components'
import Button from './Button'

const TodosFilterItem = styled.div`
display: flex;
justify-content: space-between;
`
const All = styled(Button)`
flex: 1;
`
const Completed = styled(Button)`
flex: 1;
`
const Uncompleted = styled(Button)`
flex: 1;
`

export default function TodosFilter({ filter, setFilter }) {
  const handleTodosFilterToggle = (filter) => {
    return () => setFilter(filter)
  }

  return (
    <TodosFilterItem>
      <All onClick={handleTodosFilterToggle(null)}>全部</All>
      <Uncompleted onClick={handleTodosFilterToggle(true)}>未完成</Uncompleted>
      <Completed onClick={handleTodosFilterToggle(false)}>已完成</Completed>
    </TodosFilterItem>
  )
}