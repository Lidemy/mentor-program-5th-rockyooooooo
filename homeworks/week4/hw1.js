const request = require('request')

const baseUrl = 'https://lidemy-book-store.herokuapp.com'

request.get(
  {
    uri: '/books',
    baseUrl,
    qs: {
      _limit: 10
    }
  },
  (error, response, body) => {
    const data = JSON.parse(body)
    for (const book of data) console.log(book.id, book.name)
  }
)
