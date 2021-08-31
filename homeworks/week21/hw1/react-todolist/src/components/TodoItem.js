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
  const { id, content, isChecked } = todo
  const contentEditableClassName = `editableContent ${isChecked ? 'isDone' : ''}`
  return (
    <TodoItemWrapper $isChecked={isChecked}>
      <TodoCheckBox
        type="checkbox"
        checked={isChecked}
        onChange={() => handleTodoCheckBoxChange(id)}
      />
      <ContentEditable
        tagName="pre"
        className={contentEditableClassName}
        html={content}
        onChange={(e) => handleTodoContentUpdate(id, e.target.value)}
      />
      <DeleteTodoButton onClick={() => handleDeleteTodoButtonClick(id)}>刪除</DeleteTodoButton>
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
