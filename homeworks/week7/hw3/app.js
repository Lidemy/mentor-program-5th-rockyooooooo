const form = document.querySelector('.todo__form')
const input = document.querySelector('.todo__input')
const listContainer = document.querySelector('.list__container')

function addTodo(e) {
  e.preventDefault()
  if (!input.value) return

  const li = document.createElement('li')
  li.innerHTML = `
    <p>${input.value}</p>
    <span class="material-icons close">close</span>
    `
  li.classList.add('list__item')
  listContainer.appendChild(li)

  input.value = ''
}

function removeTodoFromLeftClick(e) {
  e.preventDefault()

  if (e.target.classList.contains('list__item')) {
    listContainer.removeChild(e.target)
  }

  if (e.target.parentNode.classList.contains('list__item')) {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode)
  }
}

function removeTodoFromCloseBtn(e) {
  if (e.target.classList.contains('close')) {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode)
  }
}

function toggleTodo(e) {
  if (e.target.classList.contains('list__item')) {
    e.target.classList.toggle('finished')
  }

  if (e.target.parentNode.classList.contains('list__item')) {
    e.target.parentNode.classList.toggle('finished')
  }
}

form.addEventListener('submit', addTodo)
listContainer.addEventListener('click', toggleTodo)
listContainer.addEventListener('contextmenu', removeTodoFromLeftClick)
listContainer.addEventListener('click', removeTodoFromCloseBtn)
