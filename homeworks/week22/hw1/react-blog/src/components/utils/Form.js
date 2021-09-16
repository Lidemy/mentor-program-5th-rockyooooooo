import styled from 'styled-components'
import { grayLine } from '../../constants'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 15rem;
  margin: 0 auto;
`

export const Input = styled.input`
  padding: 0.25rem;
  font-size: 1rem;
  border: none;
  outline: none;
  border-radius: 0;
  border-bottom: 1px solid ${grayLine};
  transition: border-bottom 300ms ease;

  &:focus {
  border-bottom: 1px solid black;
  }
`

export const Button = styled.button`
  margin-top: 1rem;
  padding: 0.25rem;
  font-size: 0.9rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
`

export const ErrorMessage = styled.p`
  color: red;
`