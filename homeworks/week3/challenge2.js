// // 暴力解法：將所有可能都找出來，再篩選出符合條件的答案
// // 每件物品只考慮拿或不拿，若有 n 個物品，就有 2^n 個可能
// function beTheBestThief(items, weightLimit) {
//     let bestResult = 0
//   for (let i = 0; i < Math.pow(2, items.length); i++) {
//     const bagMap = i.toString(2).padStart(3, '0') // 把 i 用二進位表示，就是所有可能的狀況，長度不足的在右邊用 0 補滿到目標位數（二進位的 n 個位數）

//     // 把標示為 1 的物品放進背包
//     let bagWeight = 0
//     let bagValue = 0
//     for (let j = bagMap.length - 1; j >= 0; j--) {
//       if (bagMap[j] === '1') {
//         if (bagWeight + items[j].weight > weightLimit) break // 檢查下一個物品加入會不會超過重量，超過就不用再繼續了
//         bagWeight += items[j].weight
//         bagValue += items[j].value
//       }
//     }

//     bestResult = Math.max(bestResult, bagValue)
//   }
//   return bestResult
// }

function beTheBestThief(items, weightLimit) {
  // 用 array 的 index 當目前重量，儲存該重量的最佳組合，隨時更新
  const bestResults = []
  // array 初始化，全部都放 0
  for (let i = 0; i <= items.length; i++) {
    const result = []
    for (let j = 0; j <= weightLimit; j++) {
      result[j] = 0
    }
    bestResults.push(result)
  }

  for (let i = 0; i < items.length; i++) {
    for (let j = 1; j <= weightLimit; j++) {
      // console.log(items[i].weight, j)
      if (items[i].weight <= j) {
        const leftWeight = j - items[i].weight
        const thisResult = items[i].value + bestResults[i][leftWeight]
        // console.log(`目前可承受重量：${j}，若加入重量：${items[i].weight}，剩餘重量為：${leftWeight}`)
        // console.log(`物品價值：${items[i].value} + 剩餘重量${leftWeight}最佳價值：${bestResults[i][leftWeight]} vs 重量 ${j} 最佳解${bestResults[i][j]}`)
        if (thisResult > bestResults[i][j]) {
          bestResults[i + 1][j] = thisResult
          // console.log(`--------------------更新重量${j}最佳解：${bestResults[i + 1][j]}--------------------`)
        } else {
          bestResults[i + 1][j] = bestResults[i][j]
          // console.log(`--------------------重量${j}最佳解維持：${bestResults[i + 1][j]}--------------------`)
        }
      }
    }
  }

  return bestResults[items.length][weightLimit]
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

  console.log(beTheBestThief(items, weightLimit))
}
