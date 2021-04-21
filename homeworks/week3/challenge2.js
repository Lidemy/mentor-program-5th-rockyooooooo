function beTheBestThief(items, weightLimit) {
  const allAttemps = []
  // 暴力解法：將所有可能都找出來，再篩選出符合條件的答案
  // 每件物品只考慮拿或不拿，若有 n 個物品，就有 2^n 個可能
  for (let i = 0; i < Math.pow(2, items.length); i++) {
    const bag = [] // 用來存這次的背包裝了那些東西
    const isInBag = i.toString(2).padStart(3, '0') // 把 i 用二進位表示，就是所有可能的狀況，長度不足的在右邊用 0 補滿到目標位數（二進位的 n 個位數）

    // 把標示為 1 的物品放進背包
    for (let j = isInBag.length - 1; j >= 0; j--) {
      if (isInBag[j] === '1') {
        bag.push({
          weight: items[j].weight,
          value: items[j].value
        })
      }
    }

    // 將這次的結果存到 allAttemps
    allAttemps.push(bag)
  }

  const validAttemps = allAttemps.slice(1).filter((attemp) => {
    // 過濾重量超過限制的結果，應該可以用 reduce()，但我還不知道怎麼寫
    let weight = 0
    for (const item of attemp) {
      weight += item.weight
    }
    return weight <= weightLimit
  })

  const result = validAttemps.map((attemp) => {
    let value = 0
    for (const item of attemp) {
      value += item.value
    }
    return value
  })
  // const allWeights = allAttemps.slice(1).map((attemp) => attemp.map(item => item.weight))
  return Math.max(...result)
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
  const weightLimit = Number(lines[0].split(' ')[1])
  const items = []
  lines.slice(1).forEach((el, idx) => {
    items.push({
      weight: Number(el.split(' ')[0]),
      value: Number(el.split(' ')[1])
    })
  })

  // console.log(items)
  console.log(beTheBestThief(items, weightLimit))
}
