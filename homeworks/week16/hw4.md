## 從綁定角度來看：

[What’s THIS in JavaScript ?](https://kuro.tw/posts/2017/10/12/What-is-THIS-in-JavaScript-%E4%B8%8A/)

- 預設綁定（Default Binding）：  
宣告在 Global Scope 的變數，就是全域物件（window 或 global）的屬性，所以當 function 被直接呼叫，或是用 `func.call(null)`, `func.apply(undefined)`，此時的 `this` 會自動指向到全域物件。在 `use strict`，指向到全物物件的 `this` 則會是 `undefined`
- 隱式綁定（Implicit Binding）：  
呼叫 function 的時機點
- 顯式綁定（Explicit Binding）：  
用 `call()`, `apply()`, `bind()` 來直接指定 `this`
- `new` 關鍵字綁定：  
當用 new 來建立一個先的物件，這個新的物件會被設為 `this` 綁定的目標

### 優先順序

new 綁定 > 顯示綁定 > 隱式綁定 > 預設綁定

## 想成用 `call()` 來呼叫 function：

[淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂](https://blog.huli.tw/2019/02/23/javascript-what-is-this/)

呼叫 function 的方法改成用 `call()` 的形式來看，可以解決九成的 `this` 問題。

例如：`obj.hello()` 就看成 `obj.hello.call(obj)`，這時 `this` 就是 `obj`，如果是 `hello()`，因為前面沒有東西，就看成 `hello.call()`，也就是 `window.hello.call(window)`，`window` 是全域物件，在 node.js 則是 `global`。

## 從規範角度來看：

太難了，看文章：[JavaScript深入之从ECMAScript规范解读this](https://github.com/mqyqingfeng/Blog/issues/7)

## 題目：

```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

### 先說結論

```javascript
2
2
undefined
```

### 從綁定角度來看

#### `obj.inner.hello()`

1. 沒有用 `new`
2. 沒有 `call()`, `apply()`, `bind()`
3. 不是直接呼叫 function（呼叫的 function 不是全域物件的屬性）

所以是隱式綁定，`this` 的值取決於呼叫 function 的時機點。

`hello()` 由 `obj.inner` 這個物件呼叫，所以 `this` 的值為 `obj.inner`，`this.value` 就是 `obj.inner.value`，所以會印出 `2`。

#### `obj2.hello()`

`obj2` 就是 `obj.inner`，指向同一個物件，所以跟上一個一樣會印出 `2`。

#### `hello()`

`hello` 是全域變數，也就是一個全域物件的屬性，所以是預設綁定。

`this` 的值為全域物件 `window`，`this.value` 為 `window.value`，由於我們沒有宣告 `value` 這個全域變數，所以印出 `undefined`。

###  想成用 `call()` 來呼叫 function

#### `obj.inner.hello()`

看成 `obj.inner.hello.call(obj.inner)`，`this` 為 `obj.inner`，`this.value` 就會是 `obj.inner.value`，印出 `2`。

#### `obj2.hello()`

看成 `obj2.hello.call(obj2)`，`obj2` 就是 `obj.inner`，所以是 `obj.inner.hello.call(obj.inner)`，跟上一個是一樣的東西，印出 `2`。

#### `hello()`

看成 `hello.call()`，或看成 `window.hello.call(window)`，我們沒有宣告叫做 `value` 的全域變數，所以印出 `undefined`。

### 從規範角度來看

讀了 [JavaScript深入之从ECMAScript规范解读this](https://github.com/mqyqingfeng/Blog/issues/7) 之後，覺得並沒有很難懂，所以想試試看也從這個角度來做這一題，結果發現有些地方還是有點抽象，沒辦法說得很清楚，而且很多專有名詞不懂，所以省略了一些東西。

#### `obj.inner.hello()`

MemberExpression 結果是 `obj.inner.hello`，根據規範 [11.2.1 Property Accessors](https://es5.github.io/x11.html#x11.2.1) 的第一句跟倒數第二句：

> Properties are accessed by name, using either the dot notation

> Return a value of type Reference whose base value is baseValue and whose referenced name is propertyNameString, and whose strict mode flag is strict.

`obj.inner.hello` 回傳一個 value of type Reference：

```javascript
var Reference = {
  base: obj.inner,
  name: 'hello',
  strict: false
}
```

base value 是一個 Object，所以 `this` 的值就是 `obj.inner`，`this.value` 就是 `obj.inner.value`，印出 `2`。

#### `obj2.hello()`

同上一個的流程，`this` 的值就是 `obj2`，而 `obj2` 就是 `obj.inner`，所以跟上一個一樣，印出 `2`。

```javascript
var Reference = {
  base: obj2,
  name: 'hello',
  strict: false
}
```

#### `hello()`

MemberExpression 是 `hello`，根據規範 [10.3.1 Identifier Resolution](https://es5.github.io/x10.html#x10.3.1)，回傳一個 value of type Reference：

```javascript
var helloReference = {
  base: EnvironmentRecord,
  name: 'hello',
  strict: false
}
```

base value 是一個 Environment Record，`this` 的值會是 `undefined`，非嚴格模式下 `this` 會轉向全域物件，所以 `this.value` 變成 `window.value`，我們沒有宣告 `value` 這個全域變數，所以印出 `undefined`。

## 技術總結

- 物件導向下的 `this` 就是 instance 本身
- 脫離了物件，`this` 的值就沒什麼意義
- 沒什麼意義的情況下，`this` 的預設綁定：
  1. 嚴格模式下是 `undefined`
  2. 非嚴格模式下，在瀏覽器是 `window`，在 node.js 是 `global`
- 可以用 `call()`, `apply()`, `bind()` 來指定 `this` 的值
- 一旦 `bind()` 後，`this` 的值就不會再變動
- `this` 跟作用域、程式碼的位置無關，只跟如何呼叫、呼叫的時機點有關
- 小撇步：把原本的 function call 改成用 `call()` 來看，例如 `obj.func()` 就看成 `obj.func.call(obj)`
- 箭頭函式的 `this` 跟宣告該箭頭函式的地方的 `this` 一樣
- 箭頭函式沒有自己的 `this`，所以用 `call()` 或 `apply()` 只能傳參數，`thisArg` 會被忽略

## 參考資料

[淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂](https://blog.huli.tw/2019/02/23/javascript-what-is-this/)
[What’s THIS in JavaScript ?](https://kuro.tw/posts/2017/10/12/What-is-THIS-in-JavaScript-%E4%B8%8A/)
[JavaScript深入之从ECMAScript规范解读this](https://github.com/mqyqingfeng/Blog/issues/7)
[箭頭函式](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
[this 的值到底是什么？一次说清楚](https://zhuanlan.zhihu.com/p/23804247)
[JS this](https://github.com/nightn/front-end-plan/blob/master/js/js-this.md)
