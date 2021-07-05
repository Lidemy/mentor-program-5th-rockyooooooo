for loop 會從 `i = 0` 執行到 `i = 4` 共五次，每次會執行 `console.log('i: ' + i)` 跟 `setTimeout()`。

`setTimeout()` 裡的 `() => { console.log() }` 會先放進 callback queue，等到 for loop 執行結束後才會執行，而 `var` 宣告的是 function scope variable，for loop 執行結束 `i` 已經是 `5`，所以 `setTimeout()` 的 `console.log()` 印出來的全部都是 `5`。

`setTimeout()` 設定的 `i * 1000` 是當下 `i` 的值，所以會分別是 `0`, `1000`, `2000`, `3000`, `4000`，第一個印出的 `5` 會跟前面的 `console.log('i: ' + i)` 幾乎同時印出，之後每隔一秒會印出一個 `5`。

`setTimeout()` 設定的延遲不能保證在該時間過後一定會執行，只是最少要等待該時間後，盡快執行。

|時間（粗略）|0s|1s|2s|3s|4s|4s 後|
|-|-|-|-|-|-|-|
|印出|i: 0<br>i: 1<br>i: 2<br>i: 3<br>i: 4<br>5<br>|5|5|5|5|(已結束)|

輸出：

```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```

執行過程：

```javascript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

1. 宣告變數 i 並賦值 0，i < 5，進入迴圈
2. `console.log('i: ' + i)` push 進 call stack，此時 `i = 0`，印出 `i: 0`，`console.log('i: ' + i)` pop 出 call stack

|時間|0s|1s|2s|3s|4s|4s 後|
|-|-|-|-|-|-|-|
|印出|i: 0||||||

3. `setTimeout()` push 進 call stack，瀏覽器開始計時，此時 `i = 0`，所以 0ms 後，也就是馬上把箭頭函式 push 進 callback queue，`setTimeout()` pop 出 call stack
4. `i++`，`i = 1`，迴圈繼續
5. `console.log('i: ' + i)` push 進 call stack，此時 `i = 1`，印出 `i: 1`，`console.log('i: ' + i)` pop 出 call stack

|時間|0s|1s|2s|3s|4s|4s 後|
|-|-|-|-|-|-|-|
|印出|i: 0<br>i: 1||||||

6. `setTimeout()` push 進 call stack，瀏覽器開始計時，此時 `i = 1`，所以 1000ms 後把箭頭函式 push 進 callback queue，`setTimeout()` pop 出 call stack
7. `i++`，`i = 2`，迴圈繼續
8. `console.log('i: ' + i)` push 進 call stack，此時 `i = 2`，印出 `i: 2`，`console.log('i: ' + i)` pop 出 call stack

|時間|0s|1s|2s|3s|4s|4s 後|
|-|-|-|-|-|-|-|
|印出|i: 0<br>i: 1<br>i: 2||||||

9. `setTimeout()` push 進 call stack，瀏覽器開始計時，此時 `i = 2`，所以 2000ms 後把箭頭函式 push 進 callback queue，`setTimeout()` pop 出 call stack
10. `i++`，`i = 3`，迴圈繼續
11. `console.log('i: ' + i)` push 進 call stack，此時 `i = 3`，印出 `i: 3`，`console.log('i: ' + i)` pop 出 call stack

|時間|0s|1s|2s|3s|4s|4s 後|
|-|-|-|-|-|-|-|
|印出|i: 0<br>i: 1<br>i: 2<br>i: 3||||||

12. `setTimeout()` push 進 call stack，瀏覽器開始計時，此時 `i = 3`，所以 3000ms 後把箭頭函式 push 進 callback queue，`setTimeout()` pop 出 call stack
13. `i++`，`i = 4`，迴圈繼續
14. `console.log('i: ' + i)` push 進 call stack，此時 `i = 4`，印出 `i: 4`，`console.log('i: ' + i)` pop 出 call stack

|時間|0s|1s|2s|3s|4s|4s 後|
|-|-|-|-|-|-|-|
|印出|i: 0<br>i: 1<br>i: 2<br>i: 3<br>i: 4||||||

15. `setTimeout()` push 進 call stack，瀏覽器開始計時，此時 `i = 4`，所以 4000ms 後把箭頭函式 push 進 callback queue，`setTimeout()` pop 出 call stack
16. `i++`，`i = 5`，迴圈結束
17. call stack 已清空，callback queue 第一個東西 pop 出來，push 到 call stack 執行
18. push `console.log(i)` 到 call stack，此時 `i = 5`，印出 `5`，pop 掉 `console.log(i)`，並 pop 掉箭頭函式

|時間|0s|1s|2s|3s|4s|4s 後|
|-|-|-|-|-|-|-|
|印出|i: 0<br>i: 1<br>i: 2<br>i: 3<br>i: 4<br>5||||||

（以上過程幾乎在幾毫秒內發生）

19. 1000ms 到，箭頭函式 push 進 callback queue，同時 call stack 是空的，所以 pop 掉並 push 進 call stack
20. push `console.log(i)` 到 call stack，此時 `i = 5`，印出 `5`，pop 掉 `console.log(i)`，並 pop 掉箭頭函式

|時間|0s|1s|2s|3s|4s|4s 後|
|-|-|-|-|-|-|-|
|印出|i: 0<br>i: 1<br>i: 2<br>i: 3<br>i: 4<br>5|5|||||

21. 2000ms 到，箭頭函式 push 進 callback queue，同時 call stack 是空的，所以 pop 掉並 push 進 call stack
22. push `console.log(i)` 到 call stack，此時 `i = 5`，印出 `5`，pop 掉 `console.log(i)`，並 pop 掉箭頭函式

|時間|0s|1s|2s|3s|4s|4s 後|
|-|-|-|-|-|-|-|
|印出|i: 0<br>i: 1<br>i: 2<br>i: 3<br>i: 4<br>5|5|5||||

23. 3000ms 到，箭頭函式 push 進 callback queue，同時 call stack 是空的，所以 pop 掉並 push 進 call stack
24. push `console.log(i)` 到 call stack，此時 `i = 5`，印出 `5`，pop 掉 `console.log(i)`，並 pop 掉箭頭函式

|時間|0s|1s|2s|3s|4s|4s 後|
|-|-|-|-|-|-|-|
|印出|i: 0<br>i: 1<br>i: 2<br>i: 3<br>i: 4<br>5|5|5|5|||

25. 4000ms 到，箭頭函式 push 進 callback queue，同時 call stack 是空的，所以 pop 掉並 push 進 call stack
26. push `console.log(i)` 到 call stack，此時 `i = 5`，印出 `5`，pop 掉 `console.log(i)`，並 pop 掉箭頭函式

|時間|0s|1s|2s|3s|4s|4s 後|
|-|-|-|-|-|-|-|
|印出|i: 0<br>i: 1<br>i: 2<br>i: 3<br>i: 4<br>5|5|5|5|5||

27. 程式執行完畢

|時間|0s|1s|2s|3s|4s|4s 後|
|-|-|-|-|-|-|-|
|印出|i: 0<br>i: 1<br>i: 2<br>i: 3<br>i: 4<br>5|5|5|5|5|(已結束)|
