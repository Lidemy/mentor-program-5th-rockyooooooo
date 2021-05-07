const form = document.querySelector('.todo__form')
const input = document.querySelector('.todo__input')
const listContainer = document.querySelector('.list__container')

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function addTodo(e) {
  e.preventDefault()
  if (!input.value) return

  const value = escapeHtml(input.value)
  const li = document.createElement('li')
  li.innerHTML = `
    <p class="list__content">${value}</p>
    <input class="list__edit-content hide" type="text" value="${value}">
    <div class="list__btns">
      <span class="material-icons-outlined finish-edit hide">check_circle_outline</span>
      <span class="material-icons-outlined edit">edit</span>
      <span class="material-icons delete">close</span>
    </div>
    `
  li.classList.add('list__item')
  listContainer.appendChild(li)

  input.value = ''
}

function removeTodoFromLeftClick(e) {
  e.preventDefault()

  if (e.target.classList.contains('list__item') || e.target.classList.contains('list__content')) {
    const task = e.target.closest('.list__item')
    listContainer.removeChild(task)
  }
}

function removeTodoFromDeleteBtn(e) {
  if (e.target.classList.contains('delete')) {
    const task = e.target.closest('.list__item')
    listContainer.removeChild(task)
  }
}

function toggleTodo(e) {
  if (e.target.classList.contains('list__item') || e.target.classList.contains('list__content')) {
    const task = e.target.closest('.list__item')
    if (!task.classList.contains('edit-mode')) task.classList.toggle('done')
  }
}

function toggleEditMode(e) {
  if (e.target.classList.contains('edit') || e.target.classList.contains('finish-edit')) {
    const task = e.target.closest('.list__item')
    const listContent = task.querySelector('.list__content')
    const listEditContent = task.querySelector('.list__edit-content')
    const finishBtn = task.querySelector('.finish-edit')
    const editBtn = task.querySelector('.edit')
    task.classList.toggle('edit-mode')
    for (const elem of [listContent, listEditContent, finishBtn, editBtn]) elem.classList.toggle('hide')

    if (e.target.classList.contains('finish-edit')) listContent.innerText = listEditContent.value
  }
}

form.addEventListener('submit', addTodo)
listContainer.addEventListener('contextmenu', removeTodoFromLeftClick)
listContainer.addEventListener('click', removeTodoFromDeleteBtn)
listContainer.addEventListener('click', toggleTodo)
listContainer.addEventListener('click', toggleEditMode)
