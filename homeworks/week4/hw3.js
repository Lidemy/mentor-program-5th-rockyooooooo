const request = require('request')

const BASE_URL = 'https://restcountries.eu/rest/v2'
const query = process.argv[2]

request.get(
  {
    uri: `/name/${query}`,
    baseUrl: BASE_URL
  },
  (err, res, body) => {
    if (err) {
      return console.log(`資料獲取失敗，${err}`)
    }
    if (res.statusCode === 404) return console.log('找不到國家資訊')
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

    for (const country of data) {
      const { name, capital, currencies, callingCodes } = country
      const { code } = currencies[0]
      const countryCode = callingCodes[0]

      console.log('===============')
      console.log(`國家：${name}`)
      console.log(`首都：${capital}`)
      console.log(`貨幣：${code}`)
      console.log(`國碼：${countryCode}`)
    }
  }
)
