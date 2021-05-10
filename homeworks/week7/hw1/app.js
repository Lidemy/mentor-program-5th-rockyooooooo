const form = document.querySelector('form')
const phoneNumber = document.querySelector('#phone-number')

function reset() {
  const errorEls = document.querySelectorAll('.error-msg')
  for (const el of errorEls) el.remove()
}

function errorMsg(el, msg) {
  const text = document.createElement('p')
  text.innerText = msg
  text.classList.add('error-msg')
  el.appendChild(text)
}

function autoFocus() {
  const focus = document.querySelector('.error-msg')
  if (focus) {
    focus.previousElementSibling.focus()
    const height = focus.parentElement.offsetTop

    window.scrollTo({
      top: height,
      behavior: 'smooth'
    })
  }
}

function isValidForm() {
  const requiredEls = document.querySelectorAll('.required') // 對必填項目做驗證
  let hasError = false

  for (const el of requiredEls) {
    const input = el.querySelector('input')
    const radios = el.querySelectorAll('input[type=radio]')
    let isValid = true

    // radio input 一定有 value，所以這邊不用排除 radio input
    if (!input.value) { // 因為 input-value 會是字串，就算使用者輸入 0 也會是 '0'，所以不用寫成 input.value === ''
      isValid = false
    } else if (radios.length) {
      isValid = [...radios].some((radio) => radio.checked)
    }

    if (!isValid) {
      errorMsg(el, '此項為必填')
      hasError = true
    }
  }

  // 對手機號碼做額外驗證，只接受數字
  if (/\D/.test(phoneNumber.value)) {
    errorMsg(phoneNumber.parentNode, '手機號碼只接受數字')
    hasError = true
  }

  autoFocus()

  return !hasError
}

function printInputs() {
  const inputs = document.querySelectorAll('input')
  const inputValue = {}
  for (const input of inputs) {
    if (input.type === 'radio' && !input.checked) continue
    inputValue[input.name] = input.type === 'radio' ? input.nextElementSibling.innerText : input.value
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
  isValidForm() ? alert(printInputs()) : e.preventDefault()
  e.preventDefault()
})
