function whoIsIncompatible(choices, choice) {
  const incompatiblePerson = []
  choices.forEach((el, idx) => {
    if (el === choice) incompatiblePerson.push(idx + 1)
  })

  return incompatiblePerson
}

function iWantPlayAGame(choices) {
  const numA = choices.filter((el) => el === 'A').length
  const numB = choices.length - numA
  if (numA === numB || numA === 0 || numB === 0) return ['PEACE']
  return whoIsIncompatible(choices, numA > numB ? 'B' : 'A')
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
  const choices = lines.slice(1)
  const result = iWantPlayAGame(choices)
  for (const el of result) console.log(el)
}
