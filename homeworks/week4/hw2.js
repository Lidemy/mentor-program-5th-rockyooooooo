const request = require('request')

const BASE_URL = 'https://lidemy-book-store.herokuapp.com'
const action = process.argv[2]
const param1 = process.argv[3]
const param2 = process.argv[4]

switch (action) {
  case 'list':
    listBooks()
    break

  case 'read':
    readBook(param1)
    break

  case 'create':
    createBook(param1)
    break

  case 'delete':
    deleteBook(param1)
    break

  case 'update':
    updateBook(param1, param2)
    break

  default:
    console.log('Invalid command, valid commands: list, read, create, update, delete')
    break
}

function listBooks() {
  request.get(
    {
      uri: '/books',
      baseUrl: BASE_URL,
      qs: {
        _limit: 20
      }
    },
    (err, res, body) => {
      if (err) {
        return console.log(`資料獲取失敗，${err}`)
      }
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return console.log(`Status Code: ${res.statusCode}, Client side error`)
      }
      if (res.statusCode >= 500) {
        return console.log(`Status Code: ${res.statusCode}, Server side error`)
      }
      let data
      try {
        data = JSON.parse(body)
      } catch (e) {
        return console.log(e)
      }
      for (const book of data) console.log(book.id, book.name)
    }
  )
}

function readBook(id) {
  if (!id) return console.log('Please enter an ID')
  request.get(
    {
      uri: `/books/${Number(id)}`,
      baseUrl: BASE_URL
    },
    (err, res, body) => {
      if (err) {
        return console.log(`資料獲取失敗，${err}`)
      }
      if (res.statusCode === 404) return console.log('找不到這本書（這不是書名 XD）')
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return console.log(`Status Code: ${res.statusCode}, Client side error`)
      }
      if (res.statusCode >= 500) {
        return console.log(`Status Code: ${res.statusCode}, Server side error`)
      }
      let data
      try {
        data = JSON.parse(body)
      } catch (e) {
        return console.log(e)
      }
      console.log(data.name)
    }
  )
}

function createBook(name) {
  if (!name) return console.log('Please enter a name')
  request.post(
    {
      url: '/books',
      baseUrl: BASE_URL,
      form: {
        name
      }
    }, (err, res, body) => {
      if (err) {
        return console.log(`資料新增失敗，${err}`)
      }
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return console.log(`Status Code: ${res.statusCode}, Client side error`)
      }
      if (res.statusCode >= 500) {
        return console.log(`Status Code: ${res.statusCode}, Server side error`)
      }
      let data
      try {
        data = JSON.parse(body)
      } catch (e) {
        return console.log(e)
      }
      console.log('新增成功！')
      console.log(`書名：${data.name}，ID：${data.id}`)
    }
  )
}

function deleteBook(id) {
  if (!id) return console.log('Please enter an ID')
  request.delete(
    {
      uri: `/books/${Number(id)}`,
      baseUrl: BASE_URL
    }, (err, res, body) => {
      if (err) {
        return console.log(`資料刪除失敗，${err}`)
      }
      if (res.statusCode === 404) return console.log('刪除失敗，找不到這本書')
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return console.log(`Status Code: ${res.statusCode}, Client side error`)
      }
      if (res.statusCode >= 500) {
        return console.log(`Status Code: ${res.statusCode}, Server side error`)
      }
      console.log('刪除成功！')
    }
  )
}

function updateBook(id, name) {
  if (!id || !name) return console.log('ID and name are both required')
  request.patch(
    {
      url: `/books/${Number(id)}`,
      baseUrl: BASE_URL,
      form: {
        name
      }
    }, (err, res, body) => {
      if (err) {
        return console.log(`資料編輯失敗，${err}`)
      }
      if (res.statusCode === 404) return console.log('編輯失敗，找不到這本書')
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return console.log(`Status Code: ${res.statusCode}, Client side error`)
      }
      if (res.statusCode >= 500) {
        return console.log(`Status Code: ${res.statusCode}, Server side error`)
      }
      let data
      try {
        data = JSON.parse(body)
      } catch (e) {
        return console.log(e)
      }
      console.log('編輯成功！')
      console.log(`書名：${data.name}，ID：${data.id}`)
    }
  )
}
