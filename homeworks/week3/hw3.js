// 先找出所有因數
function printFactor(n) {
  const factors = []
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) factors.push(i)
  }
  return factors
}

// 判斷因數是否只有兩個，照題目要求，因數只有一個或多於兩個，都視為合數
function prime(n) {
  const isPrime = printFactor(n).length === 2
  console.log(isPrime ? 'Prime' : 'Composite')
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
  const inputs = lines.slice(1).map((el) => parseInt(el, 10))
  for (const input of inputs) prime(input)
}
