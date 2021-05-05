## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

- `<blockquote>` - 用來定義一段引用的文字區塊，通常用縮牌來呈現，`cite="<url>"`可以設定一個引言的來源 URL。行內引用則用`<q>`
- `<canvas>` - 可以透過 Script（通常是 JavaScript）來繪製圖案，建立動畫，甚至影片播放
- `<code>` - 用來表達程式碼片段，瀏覽器預設用 monospace 字型顯示

## 請問什麼是盒模型（box modal）

CSS 將所有元素都視為一個 box，每個盒子都有邊界（margin）、外框（border）、留白（padding）及內容（content）。
- margin - 元素跟其他元素之間的距離
- border - 元素的外框，可以設定粗細、顏色、樣式
- padding - 元素的外框和內容之間的距離
- content - 元素的內容

#### box-sizing
- content-box - 所有元素的預設值，元素的 width, height 只包含本身的內容（content），不包含 margin, border, padding。
  例如：
  ```
  .item {
    width: 100px;
    margin: 15px
    padding: 10px;
  }
  ```
  則瀏覽器渲染此 `item` 元素的實際寬度會是 
  
  $$100+15\*2+10\*2 = 150$$，總共 150px
- border-box - 元素的 width, height 包含本身的 content, border, padding，但不包含 margin。使用上比較直覺。
  例如：
  ```
  .item {
    width: 100px;
    margin: 15px
    padding: 10px;
  }
  ```
  則瀏覽器渲染此 `item` 元素的實際寬度會是 
  
  $$100+15\*2 = 130$$，總共 130px

另外還有 padding-box，是元素的 width, height 只包含本身的 content 及 padding，不包含 border 及 margin，但大部分瀏覽器已經不支援了。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

| display | inline | block | inlne-block |
| ------------ | :------------: | :------------: | :------------: |
| 寬度佔滿整個容器 | 不會 | 會 | 不會 |
| 元素前後產生換行 | 不會 | 會 | 不會 |
| 設置元素 width, height | 不行 | 可以 | 可以 |
| 垂直方向 margin, padding | 不行，且會無視其他元素的 margin, padding | 可以 | 可以 |
| 水平方向 margin, padding | 可以 | 可以 | 可以 |

由上面的表格可以看出 inline-block 元素：
- 在對待 width, height, margin, padding 時，跟 block 元素一樣
- 寬度是否占滿容器及前後是否產生換行時，跟 inline 元素一樣

> 這邊的**寬度占滿整個容器**的寬度指的不是元素的 width，甚至跟 margin, padding 都無關，比較像是強制元素在水平方向塞滿整個容器

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

- static - 所有元素的預設 position，元素就在正常布局該在的位置，只有 static 無法用 top, right, bottom, left, z-index 來改變位置
- relative - 元素會以正常布局該在的位置當定位點
- absolute - 元素會不被正常布局影響，往上找第一個非 static 的元素為定位點，若沒有則相對於`<body>`
- fixed - 元素不被正常布局影響，固定在使用者的畫面被指定的位置，不會跟著畫面捲動而移動
- sticky - relative 與 fixed 的結合，通常情況下會被視作 relative，直到元素與視窗的距離小於指定數值時，則變成 fixed，距離不再變小