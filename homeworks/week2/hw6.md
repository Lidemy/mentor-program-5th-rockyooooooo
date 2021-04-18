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
1. 執行第 2 行，宣告一個接受一個參數的函式，並命名為 isValid，接著定義 isValid 函式所執行的內容（第 3 - 9 行）。
2. 執行第 12 行，呼叫 isValid 函式，傳入一個 Array 型態的參數，value 為 3, 5, 8, 13, 22, 35。
3. 執行第 3 行，設定變數 i 並設 value 為 0，判斷 i 是否小於 arr.length，i 為 0，arr.length 為 6，true，進入第一圈迴圈。
4. 執行第 4 行，判斷 arr[i] 是否小於或等於 0，i 為 0，arr[0] 為 3，false，第一圈迴圈結束。
5. 回到第 3 行，i++，i 變成 1，判斷 i 是否小於 arr.length，i 為 1，arr.length 為 6，true，進入第二圈迴圈。
6. 執行第 4 行，判斷 arr[i] 是否小於或等於 0，i 為 1，arr[1] 為 5，false，第二圈迴圈結束。
7. 回到第 3 行，i++，i 變成 2，判斷 i 是否小於 arr.length，i 為 2，arr.length 為 6，ture，進入第三圈迴圈。
8. 執行第 4 行，判斷 arr[i] 是否小於或等於 0，i 為 2，arr[2] 為 8，false，第三圈迴圈結束。
9. 回到第 3 行，i++，i 變成 3，判斷 i 是否小於 arr.length，i 為 3，arr.length 為 6，true，進入第四圈迴圈。
10. 執行第 4 行，判斷 arr[i] 是否小於或等於 0，i 為 3，arr[3] 為 13，false，第四圈迴圈結束。
11. 回到第 3 行，i++，i 變成 4，判斷 i 是否小於 arr.length，i 為 4，arr.length 為 6，true，進入第五圈迴圈。
12. 執行第 4 行，判斷 arr[i] 是否小於或等於 0，i 為 4，arr[4] 為 22，false，第五圈迴圈結束。
13. 回到第 3 行，i++，i 變成 5，判斷 i 是否小於 arr.length，i 為 5，arr.length 為 6，true，進入第四圈迴圈。
14. 執行第 4 行，判斷 arr[i] 是否小於或等於 0，i 為 5，arr[5] 為 35，false，第四圈迴圈結束。
15. 回到第 3 行，i++，i 變成 6，判斷 i 是否小於 arr.length，i 為 6，arr.length 為 6，false，迴圈結束。
16. 執行第 6 行，設定變數 i 並設 value 為 2，判斷 i 是否小於 arr.length，i 為 2，arr.length 為 6，true，進入第一圈迴圈。
17. 執行第 7 行，判斷 arr[i] 是否嚴格不等於 arr[i-1] + arr[i-2]，i 為 2，arr[2] 為 8，arr[1] 為 5，arr[0] 為 3，8 !== 5 + 3，false，第一圈迴圈結束。
18. 回到第 6 行，i++，i 變成 3，判斷 i 是否小於 arr.length，i 為 3，arr.length 為 6，true，進入第二圈迴圈。
19. 執行第 7 行，判斷 arr[i] 是否嚴格不等於 arr[i-1] + arr[i-2]，i 為 3，arr[3] 為 13，arr[2] 為 8，arr[1] 為 5，13 !== 8 + 5，false，第二圈迴圈結束。
20. 回到第 6 行，i++，i 變成 4，判斷 i 是否小於 arr.length，i 為 4，arr.length 為 6，true，進入第三圈迴圈。
21. 執行第 7 行，判斷 arr[i] 是否嚴格不等於 arr[i-1] + arr[i-2]，i 為 4，arr[4] 為 22，arr[3] 為 13，arr[2] 為 8，22 !== 13 + 8，true，函式回傳 'invalid'。
22. 執行完畢。
