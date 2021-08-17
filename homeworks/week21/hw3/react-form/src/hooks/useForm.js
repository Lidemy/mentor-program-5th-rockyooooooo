import { useState } from 'react'

const useForm = () => {
  const [inputsContent, setInputsContent] = useState({
    name: {
      value: '',
      isValid: true,
      message: ''
    },
    email: {
      value: '',
      isValid: true,
      message: ''
    },
    'phoneNumber': {
      value: '',
      isValid: true,
      message: ''
    },
    type: {
      value: '',
      isValid: true,
      message: ''
    },
    'knowFrom': {
      value: '',
      isValid: true,
      message: ''
    },
    suggestion: {
      value: '',
      isValid: true
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    updateInputsContent({name, property: 'value'}, value)
    checkInput(name)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isFormValid = checkForm()
    if (!isFormValid) return

    const { name, email, phoneNumber, type, knowFrom, suggestion } = inputsContent
    alert(`
      暱稱: ${name.value}
      電子郵件: ${email.value}
      手機號碼: ${phoneNumber.value}
      報名類型: ${type.value}
      怎麼知道這個活動的: ${knowFrom.value === 'imagination' ? '躺在床上用想像力實作' : '趴在地上滑手機找現成的'}
      ${suggestion.value ? `建議: ${suggestion.value}` : ''}
    `)
  }

  const checkForm = () => {
    let isFormValid = true
    for(const name in inputsContent) {
      if(name === 'suggestion') continue
      checkInput(name)
      if (!inputsContent[name].isValid) isFormValid = false
    }
    return isFormValid
  }

  const handleBlur = (e) => {
    const { name } = e.target
    if (name === 'suggestion') return
    checkInput(name)
  }

  const checkInput = (name) => {
    updateInputsContent({name, property: 'isValid'}, true)
    updateInputsContent({name, property: 'message'}, '')

    if (!inputsContent[name].value) {
      updateInputsContent({name, property: 'message'}, '這裡要填辣！')
      updateInputsContent({name, property: 'isValid'}, false)
      return
    }

    if (name === 'phoneNumber' && /\D/.test(inputsContent[name].value)) {
      updateInputsContent({name, property: 'message'}, '手機號碼只接受數字辣！')
      updateInputsContent({name, property: 'isValid'}, false)
    }
  }

  const updateInputsContent = ({ name, property }, value) => {
    const newInputsContent = {...inputsContent}
    newInputsContent[name][property] = value
    setInputsContent(newInputsContent)
  }

  return {
    inputsContent,
    handleChange,
    handleSubmit,
    handleBlur
  }
}

export default useForm
