function meetupOrder(input1, input2, rule) {
  // input 可能為非常大的數，所以用字串處理
  // 先比較字串長度，字串較長，數字一定較大
  if (input1.length !== input2.length) {
    if (rule === '1') return input1.length > input2.length ? console.log('A') : console.log('B')
    if (rule === '-1') return input1.length < input2.length ? console.log('A') : console.log('B')
  }
  // 字串長度一樣，由高位數到低位數逐一比較大小，高位數較大，則原數一定較大
  for (let i = 0; i < input1.length; i++) {
    const num1 = parseInt(input1[i], 10)
    const num2 = parseInt(input2[i], 10)
    if (num1 === num2) continue // 該位數字一樣，迴圈直接 continue
    if (rule === '1') return num1 > num2 ? console.log('A') : console.log('B')
    if (rule === '-1') return num1 < num2 ? console.log('A') : console.log('B')
  }
  return console.log('DRAW')
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
  lines.forEach((el, index) => {
    if (index !== 0) {
      const inputs = el.split(' ')
      meetupOrder(inputs[0], inputs[1], inputs[2])
    }
  })
}
