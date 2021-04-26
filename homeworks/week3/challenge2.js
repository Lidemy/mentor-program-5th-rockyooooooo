function beTheBestThief(weights, values, weightLimit) {
  // 用二維陣列填 DP 表
  const bestResults = []
  // array 初始化，全部都放 0
  for (let i = 0; i <= weights.length; i++) {
    const emptyArray = Array(weightLimit + 1).fill(0)
    bestResults.push(emptyArray)
  }

  for (let i = 0; i < weights.length; i++) {
    for (let w = 1; w <= weightLimit; w++) {
      if (weights[i] <= w) {
        const leftWeight = w - weights[i]
        const thisResult = values[i] + bestResults[i][leftWeight] // 放了這個物品，要把這個物品的價值，加上放了之後，剩下的重量的最佳解，得出決定放這個物品會獲得的價值
        bestResults[i + 1][w] = Math.max(thisResult, bestResults[i][w]) // 放跟不放這個物品的價值相比，選價值高的
      } else {
        bestResults[i + 1][w] = bestResults[i][w] // 目前檢查的物品重量（weight[i]）在這個重量（w）時放不進背包，則沿用上一次的最佳解
      }
    }
  }

  return bestResults[weights.length][weightLimit]
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

  const weights = lines.slice(1).map((el) => Number(el.split(' ')[0]))
  const values = lines.slice(1).map((el) => Number(el.split(' ')[1]))
  console.log(beTheBestThief(weights, values, weightLimit))
}
