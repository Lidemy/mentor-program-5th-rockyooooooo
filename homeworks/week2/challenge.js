var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
});

var lines = [];

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on("line", function (line) {
  lines.push(line);
});

// 輸入結束，開始針對 lines 做處理
rl.on("close", function () {
  solve(lines);
});

function binarySearch(sortedArray, key) {
  let start = 0;
  let end = sortedArray.length - 1;

  while (start <= end) {
    let middle = Math.floor((start + end) / 2);

    if (sortedArray[middle] === key) {
      // found the key
      return middle;
    } else if (sortedArray[middle] < key) {
      // continue searching to the right
      start = middle + 1;
    } else {
      // search searching to the left
      end = middle - 1;
    }
  }
  // key wasn't found
  return -1;
}

// 上面都不用管，只需要完成這個 function 就好，可以透過 lines[i] 拿取內容
function solve(lines) {
  const n = parseInt(lines[0].split(" ")[0]);
  const m = parseInt(lines[0].split(" ")[1]);
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(lines[i]);
  }
  for (let i = n + 1; i <= n + m; i++) {
    console.log(arr.indexOf(lines[i]));
    // console.log(binarySearch(arr, lines[i]));
  }
}

// lines[0]                     -> ['n m']，陣列裡有 n 個數字，m 個查詢數字
// lines[1] ~ linesl[n]         -> 陣列裡的數字
// lines[n + 1] ~ lines[n + m]  -> 待查詢的數字
