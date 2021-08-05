import styled from 'styled-components'
import Button from './Button'
import colors from '../constants/colors'
import ContentEditable from './contentEditable/contentEditable'
import './contentEditable/contentEditable.css';
import PropTypes from 'prop-types'

const TodoItemWrapper = styled.li`
  position: relative;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background 300ms ease;

  &:hover button {
    opacity: 1;
  }

  ${(props) => !props.$isChecked && `&:hover {background: ${colors.bg02};}`}
`

const TodoCheckBox = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`

const DeleteTodoButton = styled(Button)`
  opacity: 0;
  flex-shrink: 0;
  transition: color 300ms ease, opacity 300ms ease;
`

export default function TodoItem({ todo, handleDeleteTodoButtonClick, handleTodoCheckBoxChange, handleTodoContentUpdate }) {
  const contentEditableClassName = `editableContent ${todo.isChecked ? 'isDone' : ''}`
  return (
    <TodoItemWrapper $isChecked={todo.isChecked}>
      <TodoCheckBox
        type="checkbox"
        checked={todo.isChecked}
        onChange={handleTodoCheckBoxChange(todo.id)}
      />
      <ContentEditable
        tagName="pre"
        className={contentEditableClassName}
        html={todo.content}
        onChange={(e) => handleTodoContentUpdate(todo.id)(e.target.value)}
      />
      <DeleteTodoButton onClick={handleDeleteTodoButtonClick(todo.id)}>刪除</DeleteTodoButton>
    </TodoItemWrapper>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired
  }).isRequired,
  handleDeleteTodoButtonClick: PropTypes.func.isRequired,
  handleTodoCheckBoxChange: PropTypes.func.isRequired,
  handleTodoContentUpdate: PropTypes.func.isRequired
}
