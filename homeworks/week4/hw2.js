const request = require('request')

const baseUrl = 'https://lidemy-book-store.herokuapp.com'
const action = process.argv[2]
const option = process.argv[3]
const option2 = process.argv[4]

switch (action) {
  case 'list':
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
    break

  case 'read':
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
    break

  case 'create':
    request.post(
      {
        url: '/books',
        baseUrl,
        form: {
          name: option
        }
      },
      (error, response, body) => {
        if (error) console.log('Error: ', error)
        console.log('StatusCode: ', response.statusCode)
        console.log('body: ', body)
      }
    )
    break

  case 'delete':
    request.delete(
      {
        uri: `/books/${Number(option)}`,
        baseUrl
      },
      (error, response, body) => {
        if (error) console.log('Error: ', error)
        console.log('StatusCode: ', response.statusCode)
      }
    )
    break

  case 'update':
    request.patch(
      {
        url: `/books/${Number(option)}`,
        baseUrl,
        form: {
          name: option2
        }
      },
      (error, response, body) => {
        if (error) console.log('Error: ', error)
        console.log('StatusCode: ', response.statusCode)
        console.log('body: ', body)
      }
    )
    break

  default:
    break
}
