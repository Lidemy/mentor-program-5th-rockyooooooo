JavaScript 是一個單執行緒的程式語言，只有一個 call stack，也就是一次只能做一件事情。

在執行程式碼的時候，會將每個動作放進 call stack，由下到上堆疊，由上到下執行，當最上面的執行完畢就會被 pop 掉，直到 stack 清空。

`setTimeout()` 會讓瀏覽器計時，並在時間到時把 `setTimeout()` 裡的 function 放進 callback queue，當 stack 清空時，callback queue 的第一個東西會被 pop 出來，並 push 進 stack 執行。

stack 為先進後出，queue 為先進先出。

輸出：

```
1
3
5
2
4
```

執行順序：

```javascript
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

1. `main()` push 進 stack
2. `console.log(1)` push 進 stack
3. 印出 `1`
4. `console.log(1)` pop 出 stack
5. `setTimeout()` push 進 stack
6. 瀏覽器收到 `setTimeout()`，開始計時器，0ms 後會把匿名函式 push 進 callback queue
7. `setTimeout()` pop 出 stack
8. `console.log(3)` push 進 stack
9. 印出 `3`
10. `console.log(3)` pop 出 stack
11. `setTimeout()` push 進 stack
12. 瀏覽器收到 `setTimeout()`，開始計時器，0ms 後會把匿名函式 push 進 callback queue
13. `setTimeout()` pop 出 stack
14. `console.log(5)` push 進 stack
15. 印出 `5`
16. `console.log(5)` pop 出 stack
17. `main()` pop 出 stack
18. stack 已清空，將 callback queue 第一個東西 pop 出來並 push 進 stack
19. `console.log(2)` push 進 stack
20. 印出 `2`
21. `console.log(2)` pop 出 stack
22. 匿名函式 pop 出 stack
23. stack 再次清空，將 callback queue 第一個東西 pop 出來並 push 進 stack
24. `console.log(4)` push 進 stack
25. 印出 `4`
26. `console.log(4)` pop 出 stack
27. 匿名函式 pop 出 stack
28. stack 清空，callback queue 清空，程式執行完畢
