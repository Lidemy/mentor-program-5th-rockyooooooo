import styled from "styled-components"
import { Paragraph } from './utils'
import { InputText, InputRadio } from './formInputs'
import useForm from '../hooks/useForm'
import inputs from "../initInputData"

const Button = styled.button`
  background-color: #fad312;
  padding: 13px 31px;
  border: none;
  border-radius: 3px;
  font-size: 15px;
  margin-bottom: 20px
`

export default function Form () {
  const { inputsContent, handleChange, handleBlur, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input) => {
        const { id } = input
        return id === 'type' ?
          <InputRadio key={id} input={input} content={inputsContent[id]} onChange={handleChange} onBlur={handleBlur} /> :
          <InputText key={id} input={input} content={inputsContent[id]} onChange={handleChange} onBlur={handleBlur} />
      })}
      <Button type="submit">提交</Button>
      <Paragraph>請勿透過表單送出您的密碼。</Paragraph>
    </form>
  )
}
