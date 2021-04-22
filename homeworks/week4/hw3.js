const request = require('request')

const baseUrl = 'https://restcountries.eu/rest/v2'
const query = process.argv[2]

request.get(
  {
    uri: `/name/${query}`,
    baseUrl
  },
  (error, response, body) => {
    const data = JSON.parse(body)

    if (data.status === 404) return console.log('找不到國家資訊')

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
