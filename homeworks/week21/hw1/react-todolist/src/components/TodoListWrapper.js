import styled from 'styled-components'
import { TodoItem, Button, TodosFilter } from './'
import PropTypes from 'prop-types'

const TodoListWrapperItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const TodoList = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const RemoveAllTodosButton = styled(Button)`
  margin: 0 auto;
`

export default function TodoListWrapper({ todos, setTodos, filter, setFilter }) {
  const handleDeleteTodoButtonClick = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleTodoCheckBoxChange = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        isChecked: !todo.isChecked
      }
    }))
  }

  const handleTodoContentUpdate = (id, editedTodoContent) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        content: editedTodoContent
      }
    }))
  }

  const handleRemoveAllTodosButtonClick = () => setTodos([])
  return (
    <TodoListWrapperItem>
      <TodosFilter setFilter={setFilter} />
      <TodoList>
        {todos
          .filter((todo) => todo.isChecked !== filter)
          .map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleDeleteTodoButtonClick={handleDeleteTodoButtonClick}
                handleTodoCheckBoxChange={handleTodoCheckBoxChange}
                handleTodoContentUpdate={handleTodoContentUpdate}
              />
            )
          }
        )}
      </TodoList>
      <RemoveAllTodosButton onClick={handleRemoveAllTodosButtonClick}>刪除全部</RemoveAllTodosButton>
    </TodoListWrapperItem>
  )
}

TodoListWrapper.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      isChecked: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([null, true, false]),
  setFilter: PropTypes.func.isRequired
}
