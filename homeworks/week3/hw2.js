// 把數字每一位用 array 分開存放
function storeInArray(i, digit) {
  let num = i
  let index = digit - 1
  const arr = []
  while (num % 10 || index >= 0) {
    arr[index] = num % 10
    num = Math.floor(num / 10)
    index -= 1
  }
  return arr
}

// 計算數字為幾位數
function digits(n) {
  let digit = 1
  while (Math.floor(n / 10)) {
    digit += 1
    n /= 10
  }
  return digit
}

function isNarcissisticNum(n) {
  const digit = digits(n)
  const arr = storeInArray(n, digit)

  // 把每一位乘上 digit 並加總
  const num = arr.reduce((sum, cur) => sum + Math.pow(cur, digit), 0)

  if (n !== num) return false
  return true
}

/* -------------------LIOJ------------------- */
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line)
})

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines)
})

// 上面都不用管，只需要完成這個 function 就好，可以透過 lines[i] 拿取內容
function solve(lines) {
  const input = lines[0].split(' ')
  const min = parseInt(input[0], 10)
  const max = parseInt(input[1], 10)
  for (let i = min; i <= max; i++) {
    if (isNarcissisticNum(i)) console.log(i)
  }
}
