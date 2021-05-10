const request = require('request')

const API_URL = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'
let count = 10000
let [first, second, third, none, error] = [0, 0, 0, 0, 0]

function getLottery(err, res, body) {
  if (err) return console.log(err)

  let data
  try {
    data = JSON.parse(body)
  } catch (e) {
    return request(API_URL, getLottery)
  }

  const { prize } = data

  switch (prize) {
    case 'FIRST':
      first++
      break
    case 'SECOND':
      second++
      break
    case 'THIRD':
      third++
      break
    case 'NONE':
      none++
      break
    default:
      error++
  }

  count--

  console.log(`頭獎：${first}, 二獎：${second}, 三獎：${third}, 銘謝惠顧：${none}, 錯誤：${error}`)
  if (count) request(API_URL, getLottery)
}

request(API_URL, getLottery)
