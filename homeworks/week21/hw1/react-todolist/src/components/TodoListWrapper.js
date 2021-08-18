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
    return () => setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleTodoCheckBoxChange = (id) => {
    return () => {
      setTodos(todos.map((todo) => {
        return {
          ...todo,
          isChecked: todo.id === id ? !todo.isChecked : todo.isChecked
        }
      }))
    }
  }

  const handleTodoContentUpdate = (id) => {
    return (editedTodoContent) => {
      setTodos(todos.map((todo) => {
        return {
          ...todo,
          content: todo.id === id ? editedTodoContent : todo.content
        }
      }))
    }
  }

  const handleRemoveAllTodosButtonClick = () => {
    if (!todos.length) return
    setTodos([])
  }

  return (
    <TodoListWrapperItem>
      <TodosFilter filter={filter} setFilter={setFilter} />
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
