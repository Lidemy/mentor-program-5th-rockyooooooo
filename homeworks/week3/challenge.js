function BFS(maze, height, width) {
  const target = [height - 1, width - 1]
  // queue 用來存路徑，而非只存一個位置，所以 queue 裡會存很多個路徑，每個路徑每次都同時走一步，先走到終點的就是最短路徑
  const queue = []
  queue.push([[0, 0]]) // queue === [[[0, 0]]]
  maze[0][0] = '*' // * 代表此位置已走過

  // 開始搜尋路徑
  while (queue.length > 0) {
    // 把路徑從 queue 裡拿出來，下一步若有多種選擇，會分成多個路徑，在迴圈結束之前加回來
    const path = queue.shift() // path === [[0, 0]]
    const position = path[path.length - 1] // [0, 0]獲取本次路徑最後一個位置

    // 尋找鄰近可通行的位置
    const directions = [
      [position[0], position[1] + 1],
      [position[0], position[1] - 1],
      [position[0] + 1, position[1]],
      [position[0] - 1, position[1]]
    ]

    for (let i = 0; i < directions.length; i++) {
      // 如果這個方向剛好是終點，直接 return 加入終點的 path
      if (directions[i][0] === target[0] && directions[i][1] === target[1]) {
        return path.concat([target])
      }

      if (directions[i][0] < 0 || directions[i][0] >= height ||
        directions[i][1] < 0 || directions[i][1] >= width ||
        maze[directions[i][0]][directions[i][1]] !== '.') {
        continue
      }

      queue.push(path.concat([directions[i]]))
      maze[directions[i][0]][directions[i][1]] = '*'
    }
  }
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
  const maze = lines.slice(1).map((el) => el.split(''))
  const size = lines[0].split(' ').map((el) => Number(el))

  console.log(BFS(maze, size[0], size[1]).length - 1)
}
