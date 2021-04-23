const request = require('request')

const BASE_URL = 'https://api.twitch.tv/kraken'
const game = process.argv[2]

const offset = 0

function getStreams(offset) {
  request.get(
    {
      baseUrl: BASE_URL,
      uri: '/streams',
      headers: {
        Accept: 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'gr17hvsma74whtwjtyu3hj3fwj77tb'
      },
      qs: {
        game,
        offset,
        limit: 100
      }
    }, (err, res, body) => {
      if (err) return console.log(`資料獲取失敗，${err}`)

      let data
      try {
        data = JSON.parse(body)
      } catch (e) {
        console.log(e)
      }

      const { streams } = data

      for (const stream of streams) {
        const { channel } = stream
        console.log(channel.display_name, channel._id)
      }
    }
  )

  // 這邊寫得很爛，但先這樣
  if (offset < 100) {
    offset += 100
    getStreams(offset)
  }
}

getStreams(offset)
