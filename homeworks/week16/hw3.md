直接先技術總結：

1. JavaScript 引擎執行時分兩個階段，**編譯階段**跟**執行階段**，編譯階段結束才會進入執行階段
2. 編譯階段主要處理變數宣告跟函式宣告，這個階段會建立 Execution Context
3. 進入一個 Execution Context 時會照順序做三件事：
    1. 把傳進當前 function 的參數放進 VO 並賦值，沒有值的話就是 `undefine`
    2. 把當前 function 裡的 function 宣告放進 VO，如果已經有同名的，就直接覆蓋掉
    3. 把當前 function 裡的變數宣告放進 VO，並初始化為 `undefine`，如果已經有同名的，就不做事
4. hoisting 指的就是編譯階段時會先宣告變數跟函式，所以只會提升宣告，不會提升賦值
5. `var` 宣告的是 function scope variable

輸出：

```javascript
undefine
5
6
20
1
10
100
```

執行過程：

```javascript
var a = 1           // line 1
function fn(){      // line 2
  console.log(a)    // line 3
  var a = 5         // line 4
  console.log(a)    // line 5
  a++               // line 6
  var a             // line 7
  fn2()             // line 8
  console.log(a)    // line 9
  function fn2(){   // line 10
    console.log(a)  // line 11
    a = 20          // line 12
    b = 100         // line 13
  }                 // line 14
}                   // line 15
fn()                // line 16
console.log(a)      // line 17
a = 10              // line 18
console.log(a)      // line 19
console.log(b)      // line 20
```

> 簡稱說明：  
EC: Execution context  
VO: Variable Object

首先進行編譯階段：

1. 第 1 行，在 Global EC 的 VO 新增一個變數 `a`
2. 第 2 行，在 Global EC 的 VO 新增一個函式 `fn`
3. 第 3 行，沒有變數宣告，跳過（以下如果沒有變數宣告直接省略）
4. 第 4 行，在 fn EC 的 VO 新增一個變數 `a`
5. 第 7 行，在 fn EC 的 VO 已經有 `a`，所以不做任何事
6. 第 10 行，在 fn EC 的 VO 新增一個函式 `fn2`

變數宣告完畢，此時各個 EC 的 VO：

```javascript
globalScope: {
  a: undefine,
  fn: function
}

fnScope: {
  a: undefine,
  fn2: function
}
```

再來執行階段：

1. 第 1 行，在 global VO 找 `a`，找到所以賦值 `1`
```javascript
globalScope: {
  a: 1,
  fn: function
}

fnScope: {
  a: undefine,
  fn2: function
}
```
2. 第 16 行，在 global VO 找 `fn`，找到，呼叫回傳的 `function`
3. 第 3 行，在 fn VO 找 `a`，找到，值是 `undefine`，  
呼叫 `console.log()` 印出 `undefine`
4. 第 4 行，在 fn VO 找 `a`，找到，賦值 `5`
```javascript
globalScope: {
  a: 1,
  fn: function
}

fnScope: {
  a: 5,
  fn2: function
}
```
5. 第 5 行，在 fn VO 找 `a`，找到，值是 `5`，  
呼叫 `console.log()` 印出 `5`
6. 第 6 行，在 fn VO 找 `a`，找到，值是 `5`，賦值 `6`
```javascript
globalScope: {
  a: 1,
  fn: function
}

fnScope: {
  a: 6,
  fn2: function
}
```
7. 第 7 行，在 fn VO 找 `a`，找到，沒有賦值，所以不做任何事
8. 第 8 行，在 fn VO 找 `fn2`，找到，呼叫回傳的 `function`
9. 第 11 行，在 fn2 VO 找 `a`，找不到，  
往上層的 fn VO 找 `a`，找到，值是 `6`，  
呼叫 `console.log()` 印出 `6`
10. 第 12 行，在 fn2 VO 找 `a`，找不到，  
往上層的 fn VO 找 `a`，找到，賦值 `20`
```javascript
globalScope: {
  a: 1,
  fn: function
}

fnScope: {
  a: 20,
  fn2: function
}
```
11. 第 13 行，在 fn2 VO 找 `b`，找不到，  
往上層的 fn VO 找 `b`，找不到，  
往上層 global VO 找 `b`，找不到，
    1. 若在嚴格模式，會回傳錯誤訊息 `ReferenceError: b is not defined`
    2. 不在嚴格模式，在 global VO 新增一個變數 `b`，並賦值 `100`

假設我們不是在嚴格模式下
```javascript
globalScope: {
  a: 1,
  fn: function,
  b: 100
}

fnScope: {
  a: 20,
  fn2: function
}
```
12. `fn2` 執行結束，返回第 9 行，在 fn VO 找 `a`，找到，值是 `20`，  
呼叫 `console.log()` 印出 `20`
13. `fn` 執行結束，fn scope 回收
```javascript
globalScope: {
  a: 1,
  fn: function,
  b: 100
}
```
14. 返回第 17 行，在 global VO 找 `a`，找到，值是 `1`，  
呼叫 `console.log()` 印出 `1`
15. 第 18 行，在 global VO 找 `a`，找到，賦值 `10`
```javascript
globalScope: {
  a: 10,
  fn: function,
  b: 100
}
```
16. 第 19 行，在 global VO 找 `a`，找到，值是 `10`  
呼叫 `console.log()` 印出 `10`
17. 第 20 行，在 global VO 找 `b`，找到，值是 `100`  
呼叫 `console.log()` 印出 `100`
18. 程式執行結束，global scope 回收
