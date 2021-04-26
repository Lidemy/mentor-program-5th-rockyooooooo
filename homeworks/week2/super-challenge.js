// 半加器，將兩個一位元二進位數相加，輸出一個和（S）及一個進位值（C）
function halfAdder(A, B) {
  const S = A ^ B
  const C = A & B
  return [S, C]
}

// 全加器，將兩個一位元二進位數相加，**並根據輸入的低位進位值（Cin）**，輸出一個和（S）及一個進位值（Cout）
// 由兩個半加器及一個 or 運算組成
function fullAdder(A, B, Cin) {
  const [S1, Cout1] = halfAdder(A, B)
  const [S2, Cout2] = halfAdder(Cin, S1)
  return [S2, Cout1 | Cout2]
}

// 用全加器做加法運算，因為只能對一位元二進位數做運算，所以每次都要把數字 & 1，再傳進全加器
// 輸出的 sum 要放在正確位數，用 digit 逐步左移來指示應該放在哪個位置，跟原本的 result 做 or 運算可以保留原本的低位 result 不被更動
// 輸出的 carryOut 要存到下一位運算需要用到的 carryIn
function add(a, b) {
  let digit = 1
  let result = 0
  let carryIn = 0
  while (a || b || carryIn) {
    // 只對最低有效位做運算，所以把 a, b 都 & 1
    const [sum, carryOut] = fullAdder(a & 1, b & 1, carryIn)
    // 判斷輸出的 sum 為 0 或 1，若為 1，digit 的值即為放到 result 的正確位置
    // `digit | result` 可以把 sum 加到 result，並放到正確位置，且保留原本的 result 值
    result = (sum ? digit : 0) | result
    carryIn = carryOut
    // 最低有效位運算完成，右移一位
    a >>= 1
    b >>= 1
    // digit 左移一位，空位補 0，方便之後對 result 做 or 運算，用以保留原有的 result，並加入新的值
    digit <<= 1
  }
  return result
}

console.log(add(5, 3))
