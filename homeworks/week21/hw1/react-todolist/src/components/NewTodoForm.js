import styled from 'styled-components'
import colors from '../constants/colors'
import PropTypes from "prop-types"

const NewTodoFormItem = styled.form`
  width: 100%;
  display: flex;
`

const NewTodoInput = styled.input`
  flex: 1;
  text-align: center;
  font-size: 1.5rem;
  color: ${colors.gray02};
  padding: 0.25rem 0.5rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 0px;
  transition: border 300ms ease;

  &::placeholder {
    transition: color 300ms ease;
    user-select: none;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid ${colors.gray01};
    color: ${colors.white};

    &::placeholder {
      color: transparent;
    }
  }
`

export default function NewTodoForm({ id, todos, setTodos, newTodoContent, setNewTodoContent }) {
  const handleNewTodoInputChange = (e) => {
    setNewTodoContent(e.target.value)
  }
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

  return (
    <NewTodoFormItem onSubmit={handleNewTodoFormSubmit}>
      <NewTodoInput
        type="text"
        value={newTodoContent}
        onChange={handleNewTodoInputChange}
        placeholder="new todo"
      />
    </NewTodoFormItem>
  )
}

NewTodoForm.propTypes = {
  id: PropTypes.shape({
    current: PropTypes.number
  }).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      isChecked: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
  newTodoContent: PropTypes.string.isRequired,
  setNewTodoContent: PropTypes.func.isRequired
}
