import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { NewTodoForm, TodoListWrapper } from './components'
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
  max-width: 25rem;
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
  const [filter, setFilter] = useState(null)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <Container>
      <TodosContainer>
        <NewTodoForm
          id={id}
          todos={todos}
          setTodos={setTodos}
          newTodoContent={newTodoContent}
          setNewTodoContent={setNewTodoContent}
        />
        {!!todos.length && (
          <TodoListWrapper
            todos={todos}
            setTodos={setTodos}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </TodosContainer>
    </Container>
  );
}

export default App;
