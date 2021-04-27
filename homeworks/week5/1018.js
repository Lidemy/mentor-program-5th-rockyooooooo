function biggestPlatform(ladder) {
  const platformCount = []
  for (let i = 0; i < ladder.length; i++) {
    const target = ladder[i]
    const platform = ladder.filter((el) => el === target)
    platformCount.push(platform.length)
    i += platform.length
  }

  return Math.max(...platformCount)
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
  const ladderNumber = lines[0]
  if (ladderNumber === '0') return console.log(0)
  const ladder = lines[1].split(' ')
  console.log(biggestPlatform(ladder))
}
