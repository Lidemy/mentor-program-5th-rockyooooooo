const request = require('request')

const BASE_URL = 'https://api.twitch.tv/kraken'

request.get(
  {
    uri: '/games/top',
    baseUrl: BASE_URL,
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'gr17hvsma74whtwjtyu3hj3fwj77tb'
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

    for (const category of data.top) {
      const { game, viewers } = category
      const { name } = game
      console.log(viewers, name)
    }
  }
)
