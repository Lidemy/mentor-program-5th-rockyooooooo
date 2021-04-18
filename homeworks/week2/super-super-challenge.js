function multiply(num1, num2) {
  const sum = [];

  for (let i = num1.length - 1; i >= 0; i--) {
    for (let j = num2.length - 1; j >= 0; j--) {
      const high = i + j; // 高位數索引
      const low = i + j + 1; // 低位數索引
      const product = num1[i] * num2[j] + (sum[low] || 0); // 如果上一次相乘的積為兩位數，須加上高位數，短路求值，避免加到 undefine

      // 一個位數一個位數填進 sum 這個 array 裡
      sum[low] = product % 10; // 低位數，設好就不用再動了
      sum[high] = Math.floor(product / 10) + (sum[high] || 0); // 高位數，需加到下次的積，但原本的位子可能已經有數字，所以要把原本的數再加上去，短路求值，避免加到 undefine
    }
  }
  // 把 array 裡的每個數字合併成一個 string
  return sum.join("").replace(/^0/, "");
}

console.log(
  multiply(
    "9999999999999999999999999999999999999999",
    "9999999999999999999999999999999999999999"
  )
);
