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

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
- inline - 行內元素
  - 水平方向不會佔據整個容器，兩個 inline 元素可以水平排列在一起
  - 無法設置元素的 width, height
  - 垂直方向的 margin, border, padding 會被應用，但不會推開其他的 inline 元素
  - 水平方向的 margin, border, padding 會被應用，且會推開其他的 inline 元素
- block - 區塊元素
  - 寬度預設會佔據整個容器，無法跟其他元素水平排列在一起
  - 可以設置元素的 width, height
  - margin, border, padding 都會被應用，且會推開其他的元素
- inline-block - 行內區塊，以 inline 的方式呈現，同時擁有 block 的特性
  - 水平方向不會佔滿整個容器
  - 可以設定元素的 width, height
  - margin, border, padding 會被應用，且會推開其他的元素

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
- static - 所有元素的預設 position，元素就在正常布局該在的位置，只有 static 無法用 top, right, bottom, left, z-index 來改變位置
- relative - 元素會以正常布局該在的位置當定位點
- absolute - 元素會不被正常布局影響，往上找第一個非 static 的元素為定位點，若沒有則相對於`<body>`
- fixed - 元素不被正常布局影響，固定在使用者的畫面被指定的位置，不會跟著畫面捲動而移動
- sticky - relative 與 fixed 的結合，通常情況下會被視作 relative，直到元素與視窗的距離小於指定數值時，則變成 fixed，距離不再變小