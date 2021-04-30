function greedyThief(max, items) {
  // 如果小偷能帶走的數量比物品數量還多的話，直接把所有物品價值加總後回傳
  if (items.length <= max) return items.reduce((acc, cur) => Number(acc) + Number(cur))
  // 將物品依照價值高低排序，取前 max 個物品，加總物品價值後回傳
  return items.sort((a, b) => b - a).slice(0, max).reduce((acc, cur) => Number(acc) + Number(cur))
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
  const max = Number(lines[0])
  const items = lines.slice(2)
  if (max === 0) return console.log(0)
  return console.log(greedyThief(max, items))
}
