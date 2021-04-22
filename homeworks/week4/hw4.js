const request = require('request')

const baseUrl = 'https://api.twitch.tv/kraken'

request.get(
  {
    uri: '/games/top',
    baseUrl,
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'gr17hvsma74whtwjtyu3hj3fwj77tb'
    }
  },
  (error, response, body) => {
    const data = JSON.parse(body)

    for (const category of data.top) {
      const { game, viewers } = category
      const { name } = game
      console.log(viewers, name)
    }
  }
)
