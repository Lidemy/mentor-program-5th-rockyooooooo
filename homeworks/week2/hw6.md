``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
1. 執行第 12 行，呼叫 isValid 函式，傳入一個 Array 型態的參數，value 為 3, 5, 8, 13, 22, 35。
2. 執行第 3 行，設定變數 i 並設 value 為 0，判斷 i 是否小於 arr.length，i 為 0，arr.length 為 6，true，進入第一圈迴圈。
3. 執行第 4 行，判斷 arr[i] 是否小於或等於 0，i 為 0，arr[0] 為 3，false，第一圈迴圈結束。
4. 回到第 3 行，i++，i 變成 1，判斷 i 是否小於 arr.length，i 為 1，arr.length 為 6，true，進入第二圈迴圈。
5. 執行第 4 行，判斷 arr[i] 是否小於或等於 0，i 為 1，arr[1] 為 5，false，第二圈迴圈結束。
6. 回到第 3 行，i++，i 變成 2，判斷 i 是否小於 arr.length，i 為 2，arr.length 為 6，ture，進入第三圈迴圈。
7. 執行第 4 行，判斷 arr[i] 是否小於或等於 0，i 為 2，arr[2] 為 8，false，第三圈迴圈結束。
8. 回到第 3 行，i++，i 變成 3，判斷 i 是否小於 arr.length，i 為 3，arr.length 為 6，true，進入第四圈迴圈。
9. 執行第 4 行，判斷 arr[i] 是否小於或等於 0，i 為 3，arr[3] 為 13，false，第四圈迴圈結束。
10. 回到第 3 行，i++，i 變成 4，判斷 i 是否小於 arr.length，i 為 4，arr.length 為 6，true，進入第五圈迴圈。
11. 執行第 4 行，判斷 arr[i] 是否小於或等於 0，i 為 4，arr[4] 為 22，false，第五圈迴圈結束。
12. 回到第 3 行，i++，i 變成 5，判斷 i 是否小於 arr.length，i 為 5，arr.length 為 6，true，進入第四圈迴圈。
13. 執行第 4 行，判斷 arr[i] 是否小於或等於 0，i 為 5，arr[5] 為 35，false，第四圈迴圈結束。
14. 回到第 3 行，i++，i 變成 6，判斷 i 是否小於 arr.length，i 為 6，arr.length 為 6，false，迴圈結束。
15. 執行第 6 行，設定變數 i 並設 value 為 2，判斷 i 是否小於 arr.length，i 為 2，arr.length 為 6，true，進入第一圈迴圈。
16. 執行第 7 行，判斷 arr[i] 是否嚴格不等於 arr[i-1] + arr[i-2]，i 為 2，arr[2] 為 8，arr[1] 為 5，arr[0] 為 3，8 !== 5 + 3，false，第一圈迴圈結束。
17. 回到第 6 行，i++，i 變成 3，判斷 i 是否小於 arr.length，i 為 3，arr.length 為 6，true，進入第二圈迴圈。
18. 執行第 7 行，判斷 arr[i] 是否嚴格不等於 arr[i-1] + arr[i-2]，i 為 3，arr[3] 為 13，arr[2] 為 8，arr[1] 為 5，13 !== 8 + 5，false，第二圈迴圈結束。
19. 回到第 6 行，i++，i 變成 4，判斷 i 是否小於 arr.length，i 為 4，arr.length 為 6，true，進入第三圈迴圈。
20. 執行第 7 行，判斷 arr[i] 是否嚴格不等於 arr[i-1] + arr[i-2]，i 為 4，arr[4] 為 22，arr[3] 為 13，arr[2] 為 8，22 !== 13 + 8，true，函式回傳 'invalid'。
21. 執行完畢。
