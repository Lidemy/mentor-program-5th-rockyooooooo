const form = document.querySelector('form')
const inputs = document.querySelectorAll('input')
const phoneNumber = document.querySelector('#phone-number')
const imagination = document.querySelector('#imagination')
const copycat = document.querySelector('#copycat')

function reset() {
  const errorEls = document.querySelectorAll('.error-msg')
  for (const el of errorEls) el.remove()
}

function errorMsg(e, input, msg) {
  e.preventDefault()

  const text = document.createElement('p')
  text.innerText = msg
  text.classList.add('error-msg')
  input.parentNode.appendChild(text)
}

function validation(e) {
  let isValid = true

  if (!imagination.checked && !copycat.checked) {
    errorMsg(e, copycat, '此項為必填')
    isValid = false
  }

  for (const element of inputs) {
    if (element.value === '' && element.id !== 'suggestion') {
      errorMsg(e, element, '此項為必填')
      isValid = false
    }
  }

  if (/\D/.test(phoneNumber.value)) {
    errorMsg(e, phoneNumber, '手機號碼只接受數字')
    isValid = false
  }

  return isValid
}

function printInputs() {
  const inputValue = {}
  for (const input of inputs) {
    if (input.type === 'radio' && !input.checked) continue
    inputValue[input.name] = input.value
  }

  return `
  暱稱: ${inputValue.name}
  電子郵件: ${inputValue.email}
  手機號碼: ${inputValue['phone-number']}
  報名類型: ${inputValue.type}
  怎麼知道這個活動的: ${inputValue['know-from']}
  ${inputValue.suggestion ? `建議: ${inputValue.suggestion}` : ''}
  `
}

form.addEventListener('submit', (e) => {
  reset()
  if (!validation(e)) return

  alert(printInputs())
})
