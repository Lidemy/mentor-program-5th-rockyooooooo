const request = require('request')

const BASE_URL = 'https://lidemy-book-store.herokuapp.com'

request.get(
  {
    uri: '/books',
    baseUrl: BASE_URL,
    qs: {
      _limit: 10
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
