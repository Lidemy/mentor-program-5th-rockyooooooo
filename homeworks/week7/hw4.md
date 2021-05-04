## 什麼是 DOM？

文件物件模型（Document Object Model），把 HTML 文件內的標籤、圖片、文字等，定義成物件，而且用樹狀結構來表示。
瀏覽器在解析一個 HTML 文件時，會把 HTML 由上而下，把每個標籤、圖片、文字、屬性等，解析成一個 DOM tree，節點之間可分為**父子關係**及**兄弟關係**。
常用來與 JavaScript 溝通，可以用 JavaScript 來新增、修改、刪除節點。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

事件傳遞分成三個階段：
1. Capturing Phase - 事件從根節點往下到 target 之前，叫做捕獲階段
2. At Target - 事件抵達 target，叫做目標階段
3. Bubbling Phase - 事件從 target 的 parent 往上回到根節點，叫做冒泡階段

以下面的 HTML 當作範例：
```
<!DOCTYPE html>
<html>
<body>
  <ul id="list">
    <li id="list_item">
      <a id="list_item_link" target="_blank" href="http://google.com">
        google.com
      </a>
    </li>
  </ul>
</body>
</html>
```

我們在最外層的 `ul`，加上一個監聽 click 的事件，然後點擊最內層的 `a` 會發生什麼事？
1. 捕獲到 `Window`
2. 捕獲到 `Document`
3. 捕獲到 `<html>`
4. 捕獲到 `<body>`
5. 捕獲到 `<ul>`
6. 捕獲到 `<li>`
7. 抵達目標 `<a>`
6. 冒泡到 `<li>`
5. 冒泡到 `<ul>`
4. 冒泡到 `<body>`
3. 冒泡到 `<html>`
2. 冒泡到 `Document`
1. 冒泡到 `Window`

當我們用 `addEventListener` 來監聽事件時，會在第一個參數傳入要監聽的事件，在第二個參數傳入事件發生時要執行的函式
其實還有第三個參數可以決定是否要把這個監聽放在捕獲階段，傳入 `true` 則只監聽捕獲階段，預設為 `false`

## 什麼是 event delegation，為什麼我們需要它？

事件代理，假如我們現在有一個 `<ul>`，底下有 1000 個 `<li>`，而每一個 `<li>`，都要在被點擊時，彈出 alert 訊息，
如果要把監聽事件放在每一個 `<li>`，這樣就會有 1000 個監聽事件，非常沒有效率，
而且如果未來有新的 `<li>`，就又要再手動新增監聽事件。

從事件傳遞的機制，我們可以知道，每個事件都會傳回來到 event target 的上層節點，所以我們可以直接把監聽事件放在 `<ul>`，
如此一來，只要是 `<ul>` 底下的每一個節點，都一起被監聽到了，就算有後來才新增的子節點，也一樣有效。
這樣透過父節點來處理子節點的事件，就叫做 event delegation（事件代理）

例如：
```
<!DOCTYPE html>
<html>
<body>
  <ul id="list">
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</body>
</html>
```

與其這樣寫：
```
const listItems = document.querySelectorAll('li')

for (let i = 0; i < listItems.length; i++) {
  listItems[i].addEventListener('click', () => {
    alert('list item clicked')
  })
}
```

可以這樣寫：
```
const list = document.querySelector('ul')

list.addEventListener('click', () => {
  alert('list item clicked')
})
```

但因為是把監聽事件放在父節點上面，所以只要點擊父節點的範圍內，就算不是完全點在子節點上，也會觸發，
而父節點可能還會有其他不一樣的子節點，如果要在不一樣的子節點執行不一樣的事情的話，就要做額外的處理。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

- `event.preventDefault()` - 取消預設行為
  瀏覽器會對一些事件有預設行為，例如點擊一個超連結時會開新分頁（或跳轉），而 `preventDefault` 可以取消這個預設行為，例如讓一個超連結在被點擊時，不會開心分頁（或跳轉），他跟事件傳遞完全沒有關係，事件一樣會繼續傳遞。此外，當 `preventDefault` 被呼叫時，後面被傳遞的事件也都會被取消預設的行為。

  ```
  const list = document.querySelector('#list')
  const listItem = document.querySelector('#list_item')
  const listItemLink = document.querySelector('#list_item_link')

  list.addEventListener("click", (e) => {
    e.preventDefault()
    console.log('list capturing')
  }, true)
  ```

  上述程式碼，會在點擊超連結時，在 console 印出 `'list capturing'`，但網頁不會因為點擊超連結而跳轉（或開新分頁）

- `event.stopPropagation()` - 取消事件傳遞
  在事件傳遞時，可以使用 `stopPropagation` 來取消事件的傳遞，一旦呼叫這個方法，事件傳遞就會當場中斷，不會再繼續傳遞給下一個節點。
  但如果同一個節點在同一個階段有別的監聽，則還是會被執行，要想連其他監聽都不會被執行的話，可以使用 `stopImmediatePropagation`

  範例一：

  ```
  const list = document.querySelector('#list')
  const listItem = document.querySelector('#list_item')
  const listItemLink = document.querySelector('#list_item_link')

  list.addEventListener("click", (e) => {
    console.log('list capturing')
  }, true)

  listItem.addEventListener("click", (e) => {
    e.stopPropagation()
    console.log('listItem capturing')
  }, true)

  listItem.addEventListener("click", (e) => {
    console.log('listItem capturing2')
  }, true)

  listItemLink.addEventListener("click", (e) => {
    console.log('listItemLink capturing')
  }, true)
  ```

  上述程式碼在點擊 `list-item` 時，會在 console 印出：

  ```
  listItem capturing
  listItem capturing2
  ```

  範例二：

  ```
  const list = document.querySelector('#list')
  const listItem = document.querySelector('#list_item')
  const listItemLink = document.querySelector('#list_item_link')

  list.addEventListener("click", (e) => {
    console.log('list capturing')
  }, true)

  listItem.addEventListener("click", (e) => {
    e.stopImmediatePropagation()
    console.log('listItem capturing')
  }, true)

  listItem.addEventListener("click", (e) => {
    console.log('listItem capturing2')
  }, true)

  listItemLink.addEventListener("click", (e) => {
    console.log('listItemLink capturing')
  }, true)
  ```

  上述程式碼在點擊 `list-item` 時，會在 console 印出：

  ```
  listItem capturing
  ```