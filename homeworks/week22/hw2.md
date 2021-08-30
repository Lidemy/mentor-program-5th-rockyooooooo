# Week22 簡答題

## 請列出 React 內建的所有 hook，並大概講解功能是什麼

### useState

```jsx
const [value, setValue] = useState(initialValue)
```

`useState()` 回傳一個 state 跟更新這個 state 的 function，`()` 裡可傳入在第一次 render 時，該 state 的初始值。

`value` 只有透過 `setValue` 更新時，React 才會有反應，`setValue` 接收一個新的 state 後會將 component 的 re-render 排進等待隊伍。

`setValue` 也可以傳入一個 function，這個 function 會接收前一個 state，然後回傳 最新的 state，如果新的 state 跟舊的 state 值相同（用 `Object.is` 來比較），子 component 的 render 跟 effect 的執行則會被跳過。

`useState` 也可以傳入一個 function 來透過複雜計算得到該 state 的初始值，這個 function 只會在第一次 render 被調用。

#### 注意

1. `setValue` 是非同步的，如果在短時間內連續調用可能不會是預期的結果，例如：`setValue(value + 1)`，快速的執行兩次，`value` 可能只會 +1 一次，更可靠的作法是傳入 function：`setValue((prevValue) => prevValue + 1)`。
2. 小心在 `setValue` 之後執行的程式碼，例如：
    ```jsx
    function handleChange() {
      setValue(value + 1)
      console.log(value)
    }
    ```
    因為 `setValue` 是非同步的，所以直接在後面加上 `console.log(value)`，印出來的可能不  會是 `1`，更可靠的作法是使用 `useEffect`：
    ```jsx
    useEffect(() => {
      console.log(value)
    }, [value])

    function handleChange() {
      setValue(value + 1)
    }
    ```
3. `useState` 傳入的 initial value 雖然在第一次 render 之後就不會用到了，但是每次 re-render 還是會再執行一次，可以用一個簡單的範例來看：
    ```jsx
    function func() {
      console.log('in func')
      return 0
    }
    const [value, setValue] = useState(func() === 0)
    ```
    上述程式碼會在每次 re-render 都印出 `'in func'`，如果 `func` 是一個很耗效能的運算，就會讓每次 re-render 都很浪費效能，可以用 Lazy initial state 來改善：
    ```jsx
    function func() {
      console.log('in func')
      return 0
    }
    const [value, setValue] = useState(() => {
      return func() === 0
    })
    ```
    改成傳入一個 function，如此一來 func 就只會在第一次 render 的時候被執行了。

### useEffect

`useEffect` 接受一個 function 當第一個參數（稱為 effect），這個 effect 會在每次瀏覽器 paint 之後被執行。

有些 effects 需要在下次執行前先被清除，effect 可以回傳另一個 function，下次執行 effects 之前會先執行這個被回傳的 function，cleanup effects。

`useEffect` 也可以傳入一個 dependencies array 當作第二個參數，讓這個 effect 只在特定資料改變時才會再次執行。

### useContext

#### Context

component 傳遞資料時通常使用 props 往下傳，但有時在傳遞的過程中，中間的 components 並沒有使用到這些 props，只是幫忙傳遞而已，這樣不只很麻煩，也容易在中間的地方產生問題（typo 之類的），這時候就可以用到 context object。

```jsx
const MyContext = createContext()
const { Provider, Consumer } = MyContext
```

- `Provider` 用來傳遞資料
- `Consumer` 用來接收資料

用 `<MyContext.Provider value={myValue}>` 把 component 包起來，並傳入 `value` props，底下的 components 就都可以用 `<MyContext.Consumer>` 來接收這個 value。

```jsx
// Father.js
import { createContext } from 'react'
import Child from './Child.js'

export const MyContext = createContext()

function Father() {
  const myValue = 'test'
  return (
    <MyContext.Provider value={myValue}>
      <Child />
    </MyContext.Provider>
  )
}
```

```jsx
// Child.js
import { MyContext } from './Father.js'

export default function Child() {
  return (
    <MyContext.Consumer>
      {(value) => <h1>{value}</h1>}
    </MyContext.Consumer>
  )
}
```

#### useContext

`useContext` 接受一個由 `React.createContext` 回傳的 context object，並回傳該 context 目前的值。

context 目前的值取決於上層 component 最接近的 `<MyContext.Provider>` 傳入的 value。

上面的 Child 如果用 useContext 來改寫：

```jsx
// Child.js
import { useContext } from 'react'
import { MyContext } from './Father.js'

export default function Child() {
  const value = useContext(MyContext)
  return <h1>{value}</h1>
}
```

Context 也可以再包另外一個 Context。

當 MyContext 的值更新時，使用到 useContext(MyContext) 的 components 也會跟著 re-render，可以用 `memo` 或 `useMemo` 來改善效能。

### useReducer

當 state 越來越多而且邏輯越來越複雜，就可以考慮使用 `useReducer`。

`useReducer` 接受一個 `(state, action) => newState` 的 `reducer`，然後回傳目前的 state 及用來決定要使用 reducer 裡哪個邏輯的 `dispatch` function。

傳入的第二個參數則是 state 的初始值。

```jsx
const initState = {count: 0}
const reducer = (state, action) => {
  switch(action.type) {
    case 'increment':
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count - 1}
    default:
      throw new Error()
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  )
}
```

`reducer` 會根據調用 `dispatch` 時傳入的 action 執行對應的程式碼，然後回傳 state。

`useReducer` 也可以傳入 initial function 當作第三個參數，initial function 可以接受 initState，然後回傳經過 initial function 運算後的 initial State。

如此一來可以將處理初始 state 的邏輯提取出來，也可以方便之後重置 state。

```jsx
import { useReducer } from "react"

const init = (initState) => {
  return {count: initState}
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'increment':
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count - 1}
    case 'reset':
      return init(action.payload)
    default:
      throw new Error()
  }
}

const Counter = () => {
  const initState = 1
  const [state, dispatch] = useReducer(reducer, initState, init)
  return (
    <>
      <button onClick={() => dispatch({type: 'reset', payload: initState})}>reset</button>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  )
}

export default Counter
```

### useCallback

我們常會在 function component 裡面宣告需要用到的 function，而每次 component re-render 的時候就會產生一個新的 function，即使 function 的內容都是一樣的，如果我們把這個 function 當作 props 傳給下一層 component，該 component 就會因此而發生不必要的 re-render。

`useCallback` 可以幫我們記憶傳入的 function，第二個參數跟 `useEffect` 一樣是 dependencies array，只有當 dependencies 改變時，才會產生新的 function。

```jsx
const memorizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

### useMemo

`useMemo` 做的事就跟 `useCallback` 很像，只是 `useCallback` 記憶的是 function，而 `useMemo` 記憶的則是「值」。

```jsx
const memorizedValue = useMemo(() => expensiveComputing, [a, b])
```

當一個值需要經過複雜的計算，每次重新計算就會浪費效能，所以我們可以用 `useMemo` 把計算過的值給記憶起來，如果 dependencies 沒有改變，就不需要重新計算，減少浪費。

> `useCallback(fn, dependencies)` 跟 `useMemo(() => fn, dependencies)` 是一樣的。

### useRef

`useRef` 會回傳一個有 `current` 屬性的 JavaScript Object，並可以接受一個參數作為 `current` 屬性的初始值。

```jsx
const value = useRef(0)
console.log(value) // {current: 0}
```

更新 `current` 的值不會觸發 re-render，每次 render 之後 `useRef` 給的也都會是同一個物件。

`useRef` 最常用來操作 DOM 物件，例如：

```jsx
function App() {
  const inputRef = useRef()
  return <input ref={inputRef} />
}

```

如此一來，`inputRef.current` 就會是 `<input>` 這個 DOM 物件，可以直接對他操作，例如：`inputRef.current.focus()`。

### useImperativeHandle

`useImperativeHandle` 可以在使用 `ref` 時，暴露自己定義的 instance 給父 component，要搭配 `forwardRef` 一起用。

`useImperativeHandle` 接受一個 `ref` 當第一個參數，一個會回傳我們要暴露給父 component 的 Object 的 function 當第二個參數，一個 dependencies array 當第三個參數。

我們在剛剛的例子透過 `useRef` 來操作 `<input>`，但如果 `<input>` 是用一個 component 包起來的話，就需要用到 `useImperativeHandle`。

```jsx
import { useRef, useImterativeHandle, forwardRef } = 'react'

function Input(props, ref) {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus()
  }))
  return <input ref={inputRef} />
}

const NewInput = forwardRef(Input)

export default function App() {
  const inputRef = useRef()
  function handleClick() {
    inputRef.current.focus()
  }
  return (
    <>
      <h1 onClick={handleClick}>Click me!</h1>
      <NewInput ref={inputRef} />
    </>
  )
}
```

`forwardRef` 會建立一個新的 component，並將 ref 屬性傳給底下的 component。

如此一來就可以在點擊 `<h1>` 時讓 `<NewInput>` 變成 focused 狀態。

### useLayoutEffect

`useLayoutEffect` 基本上跟 `useEffect` 一樣，差別只在於執行的時機點。

![](https://raw.githubusercontent.com/donavon/hook-flow/master/hook-flow.png)
圖片來源：https://github.com/donavon/hook-flow

`useEffect` 是在瀏覽器 paints 之後執行，而 `useLayoutEffect` 會在 paints 之前執行。

### useDebugValue

`useDebugValue` 會在 React DevTools 裡的 Hooks 標籤顯示你在第一個參數傳入的值，也可以傳入一個 function 當作第二個參數，這個 function 會以 `useDebugValue` 的第一個參數為參數，然後 return 要顯示的值。

（我自己用的時候沒有在 React DevTools 裡看到 `useDebugValue` 的值 QQ）

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

- constructor：在 component 被 mount 之前被呼叫
- getDerivedStateFromProps：在 component 被 render 之前被呼叫
- shouldComponentUpdate：在 component 被 re-render 之前被呼叫（不會在第一次 render 時被呼叫）
- render：當 props 或 state 有變化，且 `shuldComponentUpdate` 為 `true` 時被呼叫
- getSnapshotBeforeUpdate：在 commit render 之前被立即呼叫（不會在第一次 render 時被呼叫）
- componentDidMount：在 component 被 mount 後執行被立即呼叫
- componentDidUpdate：在 component 被 re-render 之後被立即呼叫（不會在第一次 render 時被呼叫）
- componentWillUnmout：在 component 在被移除後被立即呼叫

## 請問 class component 與 function component 的差別是什麼？

### class component

- 用 class 來宣告 component，需要有一點物件導向基礎
- 透過 constructor 來初始化 props 及 state
- this 的值令人頭疼
- 各種 Lifecycles

### function component

- 用 function 來宣告 component，輕鬆愉快
- 直接從參數取得 props
- 過去的 function component 都是 stateless，直到 Hooks 的出現讓我們可以用 useState 來寫 stateful function component
- 各種 Hooks，甚至可以自己寫 custom hooks
- 要注意每次的 render 就是重新呼叫 function，function 裡的變數都會重新宣告，需另外做 memorized

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

在寫 React 的時候，我們希望畫面上所有更新都透過 React 來控制，好讓我們只需要注意資料的狀態，不用直接對 DOM 進行操作，所以即使是在表單裡面的欄位輸入文字，表單裡各個 elements 的 value 也要透過 React 來控制並顯示。

### controlled component

表單內容由 React 的 state 來控制，透過 setState 來更新內容。

```jsx
function Form() {
  const [content, setContent] = useState('')

  const handleChange = (e) => {
    setContent(e.target.value)
  }

  return (
    <form>
      <input type="text" value={content} onChange={handleChange} />
    </form>
  )
}
```

`<input>` 的 `value` 由 `content` 來決定，並透過 `onChange` 事件呼叫 `setContent` 來更新 `content`，進而改變 `<input>` 的 `value`。

### uncontrolled component

也就是一般的 HTML 表單，表單內容由 DOM 自己處理，要取得表單資料時透過 `ref`。

```jsx
function Form() {
  const inputRef = useRef(null)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    alert(inputRef.current.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
    </form>
  )
}
```

controlled component 讓我們在做表單的即時驗證非常方便，因為 value 是由 state 控制的，所以我們只要關注 state 就好了，只要 state 沒有通過驗證，就做相對應的處理。

不過如果你只是需要一個非常簡單的表單，不需要即時驗證，只在乎送出時的內容，用 controlled component 也可能太麻煩了，但是用 controlled component 總是不會錯的。

## 參考資料

1. [React 官方文件 - Hooks API 參考](https://zh-hant.reactjs.org/docs/hooks-reference.html)
2. [Justin Chien - 關於 useState，你需要知道的事](https://medium.com/@xyz030206/%E9%97%9C%E6%96%BC-usestate-%E4%BD%A0%E9%9C%80%E8%A6%81%E7%9F%A5%E9%81%93%E7%9A%84%E4%BA%8B-5c8c4cdda82c)
3. [Hannah Lin - [React Hook 筆記] useContext](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-usecontext-4bc289976847)
4. [Hannah Lin - [React Hook 筆記] useReducer 真的能完全取代 Redux 嗎?](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-usereducer-%E7%9C%9F%E7%9A%84%E8%83%BD%E5%AE%8C%E5%85%A8%E5%8F%96%E4%BB%A3-redux-%E5%97%8E-fabcc1e9b400)
5. [Hannah Lin - [React Hook 筆記] Memorized Hook- useMemo, useCallback](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-memorized-hook-usememo-usecallback-e08a5e1bc9a2)
6. [Hannah Lin - [React Hook 筆記] useRef](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-useref-c628cbf0d7fb)
7. [Penghua - 認識 React Hooks 之三](https://ithelp.ithome.com.tw/articles/10253073)

---

1. [React 官方文件 - React.Component](https://zh-hant.reactjs.org/docs/react-component.html#constructor)
2. [生命週期表](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

---

1. [React-Champ: Part II: When and how to use uncontrolled components](https://medium.com/@adarshsingh1407/react-champ-part-ii-when-to-use-controlled-uncontrolled-components-870f42cf398)

###### tags: `Week22`, `Lidemy-MTR05`