import { useRef } from 'react'
import styled from 'styled-components'
import Button from './Button'
import colors from '../constants/colors'

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

const TodoContent = styled.pre`
  flex: 1;
  overflow-wrap: anywhere;
  font-size: 1.5rem;
  color: ${colors.gray01};
  padding: 0.25rem 0.5rem;
  border: 1px solid transparent;
  border-radius: 0;
  cursor: default;
  transition: color 300ms ease, border-color 300ms ease;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${colors.gray01};
    cursor: text;
  }

  ${(props) => props.$isChecked && 'text-decoration: line-through;'}
  ${(props) => props.$isChecked && `color: ${colors.gray03};`}
`

const DeleteTodoButton = styled(Button)`
  opacity: 0;
  flex-shrink: 0;
  transition: color 300ms ease, opacity 300ms ease;
`

export default function TodoItem({ todo, handleDeleteTodoButtonClick, handleTodoCheckBoxChange, handleTodoContentUpdate }) {
  const todoContentRef = useRef()

  return (
    <TodoItemWrapper $isChecked={todo.isChecked}>
      <TodoCheckBox
        type="checkbox"
        checked={todo.isChecked}
        onChange={handleTodoCheckBoxChange(todo.id)}
      />
      <TodoContent
        ref={todoContentRef}
        $isChecked={todo.isChecked}
        onBlur={() => handleTodoContentUpdate(todo.id)(todoContentRef.current.innerText)}
        suppressContentEditableWarning={true} // contentEditable 跟 children 讓 react 發出警告，這行可以讓警告不要出現，但沒有解決問題
        contentEditable
      >
        {todo.content}
      </TodoContent>
      <DeleteTodoButton onClick={handleDeleteTodoButtonClick(todo.id)}>
        刪除
      </DeleteTodoButton>
    </TodoItemWrapper>
  )
}
