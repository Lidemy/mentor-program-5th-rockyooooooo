import styled from "styled-components"
import { Paragraph } from './utils'
import { InputText, InputRadio } from './formInputs'
import useForm from '../hooks/useForm'

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
  const inputs = [
    {
      name: 'name',
      id: 'name',
      label: '暱稱',
      type: 'text',
      placeholder: '您的回答'
    },
    {
      name: 'email',
      id: 'email',
      label: '電子郵件',
      type: 'email',
      placeholder: '您的電子郵件'
    },
    {
      name: 'phoneNumber',
      id: 'phoneNumber',
      label: '手機號碼',
      type: 'text',
      placeholder: '您的手機號碼'
    },
    {
      id: 'type',
      label: '報名類型',
      type: 'radio',
      options: [
        {
          name: 'type',
          id: 'imagination',
          label: '躺在床上用想像力實作',
          value: 'imagination'
        },
        {
          name: 'type',
          id: 'copycat',
          label: '趴在地上滑手機找現成的',
          value: 'copycat'
        }
      ]
    },
    {
      name: 'knowFrom',
      id: 'knowFrom',
      label: '怎麼知道這個活動的？',
      type: 'text',
      placeholder: '您的回答'
    },
    {
      name: 'suggestion',
      id: 'suggestion',
      label: '其他',
      type: 'text',
      placeholder: '您的回答',
      description: '對活動的一些建議'
    }
  ]

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
