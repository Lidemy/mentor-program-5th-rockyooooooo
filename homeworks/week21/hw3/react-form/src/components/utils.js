import styled from "styled-components"

export const Span = styled.span`
  color: #e74149;
`

export const Paragraph = styled.p`
line-height: 1.5em;
font-size: 14px;
`
export const InputGroup = styled.div`
  margin: 50px 0;
`

export const FormLabel = styled.label`
  display: block;
  font-size: 20px;
`

export const Input = styled.input`
  margin-top: 20px;
  border: 1px solid #d0d0d0;
  font-size: 16px;
  padding: 2px;
`

export const ErrorMessage = styled(Paragraph)`
  color: #e74149;
  position: absolute;
`