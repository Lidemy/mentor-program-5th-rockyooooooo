const request = require('request')

const baseUrl = 'https://lidemy-book-store.herokuapp.com'
const action = process.argv[2]
const option = process.argv[3]
const option2 = process.argv[4]

switch (action) {
  case 'list':
    listBooks()
    break

  case 'read':
    readBook()
    break

  case 'create':
    createBook()
    break

  case 'delete':
    deleteBook()
    break

  case 'update':
    updateBook()
    break

  default:
    break
}

function listBooks() {
  request.get(
    {
      uri: '/books',
      baseUrl,
      qs: {
        _limit: 20
      }
    },
    (error, response, body) => {
      const data = JSON.parse(body)
      for (const book of data) console.log(book.id, book.name)
    }
  )
}

function readBook() {
  request.get(
    {
      uri: `/books/${Number(option)}`,
      baseUrl
    },
    (error, response, body) => {
      const data = JSON.parse(body)
      console.log(data.name)
    }
  )
}

function createBook() {
  request.post(
    {
      url: '/books',
      baseUrl,
      form: {
        name: option
      }
    }
  )
}

function deleteBook() {
  request.delete(
    {
      uri: `/books/${Number(option)}`,
      baseUrl
    }
  )
}

function updateBook() {
  request.patch(
    {
      url: `/books/${Number(option)}`,
      baseUrl,
      form: {
        name: option2
      }
    }
  )
}
