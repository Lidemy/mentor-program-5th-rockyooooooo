import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import TodoItem from './components/TodoItem'
import Button from './components/Button'
import colors from './constants/colors'

const Container = styled.div`
  background: ${colors.bg01};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem;
`

const TodosContainer = styled.div`
  width: 50vw;
  max-width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const NewTodoForm = styled.form`
  width: 100%;
  display: flex;
`

const NewTodoInput = styled.input`
  flex: 1;
  font-size: 1.5rem;
  color: ${colors.gray02};
  padding: 0.25rem 0.5rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 0px;
  transition: border 300ms ease;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${colors.gray01};
    color: ${colors.white};
  }
`

const TodoList = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const TodosFilter = styled.div`
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

const RemoveAllTodosButton = styled(Button)`
  margin: 0 auto;
`

const TestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

function App() {
  const id = useRef(1)
  const [todos, setTodos] = useState(() => {
    const todosData = JSON.parse(localStorage.getItem('todos')) || []
    id.current = todosData.length ? todosData[0].id + 1 : 1
    return todosData
  })
  const [newTodoContent, setNewTodoContent] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleNewTodoInputChange = (e) => setNewTodoContent(e.target.value)
  const handleNewTodoFormSubmit = (e) => {
    e.preventDefault()
    if (!newTodoContent) return
    setTodos([{
      id: id.current,
      content: newTodoContent,
      isChecked: false
    }, ...todos])
    setNewTodoContent('')
    id.current++
  }
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

  const handleTodosFilterToggle = (filter) => {
    return () => setFilter(filter)
  }

  const handleRemoveAllTodosButtonClick = () => setTodos([])

  return (
    <Container>
      <TodosContainer>
        <NewTodoForm onSubmit={handleNewTodoFormSubmit}>
          <NewTodoInput
            type="text"
            value={newTodoContent}
            onChange={handleNewTodoInputChange}
            placeholder="new todo..."
          />
        </NewTodoForm>
        {!!todos.length && (
          <TestWrapper>
            <TodosFilter>
              <All onClick={handleTodosFilterToggle(null)}>全部</All>
              <Uncompleted onClick={handleTodosFilterToggle(true)}>未完成</Uncompleted>
              <Completed onClick={handleTodosFilterToggle(false)}>已完成</Completed>
            </TodosFilter>
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
          </TestWrapper>)
        }
      </TodosContainer>
    </Container>
  );
}

export default App;
