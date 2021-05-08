const request = require('request')

const BASE_URL = 'https://api.twitch.tv/kraken'
const LIMIT = 100
const TOTAL = 200
const GAME = process.argv[2]

// -------------------------------------------------------------------------
function getStreams(allStreams, game, offset, limit, total) {
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
        limit
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
        allStreams.push([channel.display_name, channel._id])
      }

      if (allStreams.length < total) {
        offset += limit
        return getStreams(allStreams, game, offset, limit, total)
      }

      for (const stream of allStreams) {
        const [name, id] = stream
        console.log(name, id)
      }
    }
  )
}

getStreams([], GAME, 0, LIMIT, TOTAL)
