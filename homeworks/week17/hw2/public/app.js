const BASE_URL = '.'

const indexHtml = `
  <button n id="draw-btn" class="btn btn-primary">抽！</button>
  <button id="setting-btn" class="btn btn-primary">改！</button>
`
const loginFormHtml = `
  <form id="login" class="row">
    <div class="mb-3">
      <label for="username" class="form-label">Username: </label>
      <input type="text" class="form-control" id="username">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password: </label>
      <input type="password" class="form-control" id="password"></input>
    </div>
    <input type="submit" class="btn btn-primary mb-3"></input>
    <button id="index-btn" class="btn btn-primary">回首頁</button>
  </form>
`
const dashboardHtml = `
  <div id="dashboard">
    <table id="add-prize" class="table">
      <thead>
        <tr>
          <th scope="col">名稱</th>
          <th scope="col">說明</th>
          <th scope="col">圖片網址</th>
          <th scope="col">權重（機率）</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input class="form-control form-control-sm" type="text" name="name">
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" name="description">
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" name="imgUrl">
          </td>
          <td>
            <input class="form-control form-control-sm" type="text" name="weight">
          </td>
          <td class="d-flex">
            <button id="create-btn" class="btn btn-sm btn-primary flex-shrink-0">新增</button>
          </td>
        </tr>
      </tbody>
    </table>
    <table id="prizes-table" class="table">
      <thead>
        <tr>
          <th scope="col">名稱</th>
          <th scope="col">說明</th>
          <th scope="col">圖片網址</th>
          <th scope="col">權重（機率）</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </table>
    <button id="index-btn" class="btn btn-primary">回首頁</button>
  </div>
`

// 首頁畫面
const cardBody = document.querySelector('.card-body')
cardBody.innerHTML = indexHtml

// 全部使用事件代理
cardBody.addEventListener('click', async(e) => {
  switch (e.target.id) {
    case 'draw-btn':
      handleDrawBtn()
      break
    case 'setting-btn':
      handleSettingBtn()
      break
    case 'create-btn':
      handleCreateBtn()
      break
    case 'edit-btn':
      handleEditBtn(e)
      break
    case 'delete-btn':
      handleDeleteBtn(e)
      break
    case 'index-btn':
      cardBody.innerHTML = indexHtml
      break
  }
})

// 用事件代理監聽 submit 事件，只有 login 會 submit
cardBody.addEventListener('submit', async(e) => {
  e.preventDefault()
  const { target } = e

  const data = {
    username: target[0].value,
    password: target[1].value
  }

  const result = await login(data)
  if (!result.isLoggedIn) {
    target[0].value = ''
    target[1].value = ''
    alert(result.message)
    return
  }

  cardBody.innerHTML = dashboardHtml

  try {
    const { prizes } = await getAllPrizes()
    for (const prize of prizes) {
      appendPrizeToPrizesTable(prize)
    }
  } catch (error) {
    console.error(error)
  }
})

async function handleDrawBtn() {
  const result = await drawLottery()
  const lotteryTemplate = `
    <img src="${result.imgUrl}" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">${escapeHtml(result.name)}</h5>
      <p class="card-text">${escapeHtml(result.description)}</p>
      <button id="index-btn" class="btn btn-primary">回首頁</button>
    </div>
  `
  cardBody.innerHTML = lotteryTemplate
}

async function handleSettingBtn() {
  try {
    const { prizes } = await getAllPrizes()

    // 沒拿到資料表示需要登入，顯示登入畫面
    if (!prizes) {
      cardBody.innerHTML = ''
      cardBody.innerHTML = loginFormHtml
      return
    }

    cardBody.innerHTML = dashboardHtml

    for (const prize of prizes) {
      appendPrizeToPrizesTable(prize)
    }
  } catch (error) {
    return console.error(error)
  }
}

async function handleCreateBtn() {
  if (isNaN(document.querySelector('input[name=weight]').value)) return alert('機率必須是數字啦不要壞壞！')

  const data = {}
  for (const input of ['name', 'description', 'imgUrl', 'weight']) {
    const inputEl = document.querySelector(`input[name=${input}]`)
    data[input] = input === 'weight' ? Number(inputEl.value) : inputEl.value
    inputEl.value = ''
  }
  const { prize } = await createPrize(data)
  data.id = prize.id
  appendPrizeToPrizesTable(data)
}

function handleEditBtn(e) {
  const targetTr = e.target.closest('tr')
  if (isNaN(targetTr.querySelector('input[name=weight]').value)) return alert('機率必須是數字啦不要壞壞！')

  const newData = {}
  for (const input of ['id', 'name', 'description', 'imgUrl', 'weight']) {
    const inputEl = targetTr.querySelector(`input[name=${input}]`)
    newData[input] = input === 'weight' ? Number(inputEl.value) : inputEl.value
  }
  updatePrize(newData)
}

function handleDeleteBtn(e) {
  const targetTr = e.target.closest('tr')
  const prizeId = targetTr.querySelector('input[name="id"]').value
  deletePrize(prizeId)
  removePrizeFromDOM(prizeId)
}

async function drawLottery() {
  let result = null
  try {
    const response = await fetch(`${BASE_URL}/draw`)
    result = await response.json()
  } catch (error) {
    return console.error(error)
  }

  return result
}

async function getAllPrizes() {
  const response = await fetch(`${BASE_URL}/prizes`)
  if (response.ok) {
    const result = await response.json()
    return result
  }
  throw new Error(`fetch 失敗，status code: ${response.status}`)
}

async function login(data) {
  const response = await fetch(`${BASE_URL}/login`, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  })
  const result = await response.json()
  return result
}

function appendPrizeToPrizesTable(prize) {
  const prizesTable = document.querySelector('#prizes-table tbody')
  const { id, name, description, imgUrl, weight } = prize
  const trTemplate = `
    <td><input class="form-control form-control-sm" type="text" name="name" value="${name}"></td>
    <td><input class="form-control form-control-sm" type="text" name="description" value="${description}"></td>
    <td><input class="form-control form-control-sm" type="text" name="imgUrl" value="${imgUrl}"></td>
    <td><input class="form-control form-control-sm" type="text" name="weight" value="${weight}"></td>
    <td class="d-flex flex-row me-2">
      <button id="edit-btn" class="btn btn-sm btn-success flex-shrink-0">修改</button>
      <button id="delete-btn" class="btn btn-sm btn-danger flex-shrink-0">刪除</button>
    </td>
    <input type="hidden" name="id" value="${id}">
  `

  const newTr = document.createElement('tr')
  newTr.innerHTML = trTemplate
  prizesTable.appendChild(newTr)
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

async function createPrize(data) {
  let result = null
  try {
    const response = await fetch(`${BASE_URL}/prizes`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Something went wrong')
    result = await response.json()
  } catch (error) {
    return console.error(error)
  }

  alert('新增成功')
  return result
}

async function updatePrize(data) {
  try {
    const response = await fetch(`${BASE_URL}/prizes/${data.id}`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Something went wrong')
  } catch (error) {
    return console.error(error)
  }

  alert('更新成功')
}

async function deletePrize(id) {
  try {
    const response = await fetch(`${BASE_URL}/prizes/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Something went wrong')
  } catch (error) {
    return console.error(error)
  }

  alert('刪除成功')
}

function removePrizeFromDOM(id) {
  const prizesTable = document.querySelector('#prizes-table tbody')
  const deletedPrize = document.querySelector(`input[value="${id}"]`)
  const deletedTr = deletedPrize.closest('tr')
  prizesTable.removeChild(deletedTr)
}
