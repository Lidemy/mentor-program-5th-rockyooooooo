const form = document.querySelector('form')
const inputs = document.querySelectorAll('input')
const imagination = document.querySelector('#imagination')
const copycat = document.querySelector('#copycat')

function reset() {
  const requireEls = document.querySelectorAll('.required-msg')
  for (const el of requireEls) el.remove()
}

function requireInput(e, input) {
  e.preventDefault()

  const text = document.createElement('p')
  text.innerText = '此項為必填'
  text.classList.add('required-msg')
  input.parentNode.appendChild(text)
}

function validation(e) {
  let isValid = true

  if (!imagination.checked && !copycat.checked) {
    requireInput(e, copycat)
    isValid = false
  }

  for (const element of inputs) {
    if (element.value === '' && element.id !== 'suggestion') {
      requireInput(e, element)
      isValid = false
    }
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
  Name: ${inputValue.name}
  Email: ${inputValue.email}
  Phone Number: ${inputValue['phone-number']}
  Type: ${inputValue.type}
  Know from: ${inputValue['know-from']}
  ${inputValue.suggestion ? `Suggestion: ${inputValue.suggestion}` : ''}
  `
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  reset()

  if (!validation(e)) return

  alert(printInputs())
  e.preventDefault()
})
