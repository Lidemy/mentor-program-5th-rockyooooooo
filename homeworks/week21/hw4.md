## 為什麼我們需要 React？可以不用嗎？

在回答這個問題之前，先看看 React 為什麼會被創造出來吧！

### [Why did we build React?](https://zh-hant.reactjs.org/blog/2013/06/05/why-react.html)

#### ⚛React 不是一個 MVC 框架

React 是一個用來建立 composable user interfaces 的 library，透過可以重複利用的 components 來表現會隨著時間變化的數據。

#### ⚛React 不使用 templates

一般的 web application UIs 會用 templates 或 HTML directives（？）來建立，這些 templates 會規定你怎麼建立你的 UI。

React 則把所有東西都視為 components，並利用以下幾點來建立優勢：

> 1. JavaScript is a flexible, powerful programming language with the ability to build abstractions. This is incredibly important in large applications.
> 2. By unifying your markup with its corresponding view logic, React can actually make views easier to extend and maintain.
> 3. By baking an understanding of markup and content into JavaScript, there’s no manual string concatenation and therefore less surface area for XSS vulnerabilities.

1. 利用 JavaScript 的彈性跟強大
2. 將 markup 跟與他相呼應的 view 邏輯統一，提升擴充性跟維護性
3. 把 markup 跟內容的邏輯都交給 JavaScript，不手動操作字串，減少 XSS 的漏洞

#### ⚛反應更新內容有夠簡單

這大概是 React 最核心的價值，一般當 JavaScript 要讓畫面跟資料一致，需要檢查哪些資料有變動過，再去修改 DOM。

而 React 則是讓 component 執行 render function 的時候，產生一段對畫面的敘述，表示畫面應該長成什麼樣子，並根據這個敘述來產生畫面，當資料改變的時候，render function 會再次被執行，React 會透過比較上次 render 回傳的內容跟目前的內容，只更新不同的部分。

> The data returned from render is neither a string nor a DOM node — it’s a lightweight description of what the DOM should look like.

render 回傳的這段敘述並不是字串也不是一個 DOM node，而是一段輕量的畫面描述（a lightweight representation）。

#### ⚛HTML 只是開始

因為這個 lightweight representation，React 可以做到很多特別的事情，包括在 server 上執行 React 有助於 SEO 表現、效能、分享程式碼和整體的彈性，以及事件在所有瀏覽器（包含 IE8！）中都有一致而且符合標準的運行方式且自動使用 event delegation。

### 為什麼我們需要 React？

#### 👍只需要著重關注資料

一般在寫網頁的時候，通常會根據資料來直接操作網頁上的 DOM，而用 React 比較像是我們告訴 React 我們希望畫面長什麼樣子，React 會幫我們決定哪邊的 DOM 需要修改，所以開發者就可以專注在資料上面，而不用花太多心力在畫面的更新。

#### 👍像積木一樣組裝

我們通常希望一樣的 code 可以變成一個 function 便於重複利用，減少 code 的重複性也便於維護。

React 把畫面上的每個東西都視為 components，components 會根據資料或狀態來產生，透過一個個的小 components 組合成大的 components，而 components 也可以在任何地方重複利用，更方便管理。

#### 👍單向資料流

React 的核心之一是狀態（state），當狀態改變時，畫面也要跟著改變，這個狀態會由上往下的傳遞，讓底下的子 components 知道狀態變更了，components 也要跟著更新。

資料只能由上往下傳遞，所以子 components 沒辦法把狀態往上傳到父 components，也因為這樣，開發者只需要關注**資料儲存在哪裡**，以及**資料傳遞到哪裡**。

#### 👍Virtual DOM

React 將所有 components render 到畫面上之前會先建立一個叫做 Virtual DOM 的東西，React 會根據新舊 Virtual DOM 來判斷哪裡需要 re-render，只更新不一樣的部分，而不是整個畫面重新 render，提升網頁效能。

### 可以不用 React 嗎？

學習 React 可能並不容易，把 HTML 跟 JavaScript 混在一起的 JSX 也讓人感覺有點混亂，不用 React 一樣可以寫出只關注資料的 code，一樣可以自己把每個畫面上的東西包成一個 component…等。

所以當然可以不用，React 只是一個 library，一個某個人寫好的 code 讓你可以很方便的拿來用，就只是自己造輪子跟用別人造好的輪子的差別而已

不過 React 的生態系已經很成熟，網路上的資源也非常的多，除非 React 無法解決你遇到的問題，人家造好的輪子，不香嗎？

## React 的思考模式跟以前的思考模式有什麼不一樣？

以 todolist 的新增跟刪除為例，以前都是直接對 DOM 元素操作。

- 新增：append 一個 DOM element 到畫面上
- 刪除：把 todo DOM element 從畫面上移除

React 的思考模式則是以資料為中心，畫面上會變的地方都由資料來控制，也就是說資料改變畫面就會跟著改變。

- 新增：在 todolist array 裡增加一個 todo，畫面隨著 todolist array 的改變而改變
- 刪除：從 todolist array 裡刪除一個 todo，畫面隨著 todolist array 的改變而改變

我們只會對資料做處理，畫面則是一開始設計好之後隨著資料而更新。

## state 跟 props 的差別在哪裡？

在討論 props 跟 state 的差別之前，先來看看他們一樣的地方

1. 他們都是純 JavaScript 物件
2. 他們的改變都會觸發 render method
3. 他們都是決定性的（deterministic），如果一樣的 props 跟 state 組合出不一樣的 component，那肯定是哪裡搞錯了
4. 他們都應該是不可變的（immutable，state 可以也只應該用 setState 來改變）

### props

properties 的簡寫，被傳進 component，就像是 function 的參數那樣。

```javascript
function Box(props) {
  const style = {
    color: props.color
  }
  return <p style={style}>{props.text}</p>
}

function App() {
  const text = 'props come from App'
  const color = 'yellow'
  return <Box text={text} color={color} />
}
```

上面程式碼，`App` 會回傳 `<Box text={text} color={color} />`，`text` 及 `color` 就是 `App` 傳給 `Box` 的 props，這些 props 會以一個物件的形式傳進 `Box`，在 `Box` 裡就可以存取到 `props`，`props` 就會是一個有 `text` 跟 `color` 的物件。

### state

1. state 是在 component 裡面被建立的
2. state 可以透過 `setState` 改變，如果直接對 state 賦值（ex：`this.state.count = this.state.count + 1`）將不會觸發 render

```javascript
class Button extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }
  
  handleClick() {
    this.setState((prevState, props) => {
      return {
        count: prevState.count + 1
      }
    })
  }
  
  render() {
    return (
      <button onClick={() => this.handleClick()}>
        Clicked {this.state.count} times
      </button>
    )
  }
}
```

上面程式碼是一個 class component `Button`，初始化了一個 state 裡面有 `count` 來存放點擊次數，並有一個 `handleClick` method 會呼叫 `setState` 來更新 `state`，當按鈕被點擊時，就會呼叫 `handleClick` 來更新 `state`，當 `state` 更新就會觸發 render 執行，並顯示最新的畫面。

## 參考資料

1. [Why did we build React?](https://zh-hant.reactjs.org/blog/2013/06/05/why-react.html)
2. [[筆記] Why React?](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-why-react-424f2abaf9a2)
3. [state 和 props 有什麼不同？](https://zh-hant.reactjs.org/docs/faq-state.html#what-is-the-difference-between-state-and-props)
4. [props vs state](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
5. [ReactJS: Props vs. State](https://lucybain.com/blog/2016/react-state-vs-pros/)
