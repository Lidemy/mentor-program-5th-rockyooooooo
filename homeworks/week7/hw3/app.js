const form = document.querySelector('.todo__form')
const input = document.querySelector('.todo__input')
const listContainer = document.querySelector('.list__container')

function addTodo(e) {
  e.preventDefault()
  if (!input.value) return

  const li = document.createElement('li')
  li.innerHTML = `
    <p>${input.value}</p>
    <input class="list_text hide" type="text" value="${input.value}">
    <div class="list__btns">
      <span class="material-icons-outlined finish hide">check_circle_outline</span>
      <span class="material-icons-outlined edit">edit</span>
      <span class="material-icons close">close</span>
    </div>
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
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode)
  }
}

function toggleTodo(e) {
  if (e.target.classList.contains('list__item') && !e.target.classList.contains('editMode')) {
    e.target.classList.toggle('finished')
  }

  if (e.target.parentNode.classList.contains('list__item') && !e.target.parentNode.classList.contains('editMode')) {
    e.target.parentNode.classList.toggle('finished')
  }
}

function editMode(e) {
  if (e.target.classList.contains('edit')) {
    e.target.parentNode.parentNode.classList.toggle('editMode')
    e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.classList.toggle('hide')
    e.target.parentNode.previousSibling.previousSibling.classList.toggle('hide')
    e.target.previousSibling.previousSibling.classList.toggle('hide')
    e.target.classList.toggle('hide')
  }
}

function finishedEdit(e) {
  if (e.target.classList.contains('finish')) {
    const listEl = e.target.parentNode.parentNode
    const finishBtn = e.target
    const editBtn = e.target.nextSibling.nextSibling
    const inputEl = e.target.parentNode.previousSibling.previousSibling
    const pEl = e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling
    listEl.classList.toggle('editMode')
    pEl.classList.toggle('hide')
    inputEl.classList.toggle('hide')
    editBtn.classList.toggle('hide')
    finishBtn.classList.toggle('hide')

    pEl.innerText = inputEl.value
  }
}

form.addEventListener('submit', addTodo)
listContainer.addEventListener('click', toggleTodo)
listContainer.addEventListener('contextmenu', removeTodoFromLeftClick)
listContainer.addEventListener('click', removeTodoFromCloseBtn)
listContainer.addEventListener('click', editMode)
listContainer.addEventListener('click', finishedEdit)
