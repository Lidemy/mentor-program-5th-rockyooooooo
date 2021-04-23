const request = require('request')

const BASE_URL = 'https://api.twitch.tv/kraken'
const LIMIT = 3
const TOTAL = 12
const game = process.argv[2]

// const offset = 0

// function getStreams(offset) {
//   request.get(
//     {
//       baseUrl: BASE_URL,
//       uri: '/streams',
//       headers: {
//         Accept: 'application/vnd.twitchtv.v5+json',
//         'Client-ID': 'gr17hvsma74whtwjtyu3hj3fwj77tb'
//       },
//       qs: {
//         game,
//         offset,
//         limit: LIMIT
//       }
//     }, (err, res, body) => {
//       if (err) return console.log(`資料獲取失敗，${err}`)

//       let data
//       try {
//         data = JSON.parse(body)
//       } catch (e) {
//         console.log(e)
//       }

//       const { streams } = data

//       for (const stream of streams) {
//         const { channel } = stream
//         console.log(channel.display_name, channel._id)
//       }
//     }
//   )

//   // 這邊寫得很爛，但先這樣
//   if (offset < 100) {
//     offset += 100
//     getStreams(offset)
//   }
// }

// getStreams(offset)

function getStreams(limit, offset, callback) {
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
    },
    callback
  )
}

function getAllStreams(limit, total, callback) {
  let allStreams = []

  function handleStreams(err, res, body) {
    const data = JSON.parse(body)
    const { streams } = data

    allStreams = allStreams.concat(streams)

    const offset = allStreams.length
    if (allStreams.length < total) {
      getStreams(limit, offset, handleStreams)
    } else {
      callback(null, allStreams)
    }
  }

  getStreams(limit, 0, handleStreams)
}

getAllStreams(LIMIT, TOTAL, (err, allStreams) => {
  if (err) return console.log(err)
  for (const stream of allStreams) {
    const { channel } = stream
    console.log(channel.display_name, channel._id)
  }
})
