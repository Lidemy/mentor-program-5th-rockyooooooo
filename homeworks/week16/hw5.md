## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

這週的文章也都是進入計劃之前就看過的，那時候看得頗吃力，只能大概知道有這些東西，也覺得底層的東西還不急著研究，所以都跳過處理，經過前十五週的洗禮，現在看就有信心多了也輕鬆很多，比較能夠意會，當然還是有一些比較底層的東西沒辦法理解得太清楚，不過總算是能看懂大部分了。

我覺得這些概念如果有弄懂的話，未來求職的時候，或許會是在眾多的履歷之中脫穎而出的關鍵之一，所以這週花了很多時間在看文章，想盡量弄懂每個部份，對寫 code 也會有幫助。

也發現其實很多概念都不難，只是肯不肯認真找文章跟看規格書，因為很多文章都寫得淺顯易懂，像 Huli 老大的文章就很適合新手看，也會把他自己找到的資料講得更白話，真猛。

以前自學看過老師的 [紮實的網頁前端學習路線與資源推薦](https://blog.huli.tw/2019/08/21/real-front-end-learning-path/)，覺得這麼多怎麼可能學得完，如果真的學完了我一定屌炸天，結果現在不知不覺也照著這樣的路線學了一大半了，越來越有「懂得越多，越發現自己懂得很少」的感覺，但也明顯感受到自己這幾個禮拜以來的進步。

能加入這個計畫真是太好了。

### Event loop

[What the heck is event loop anyway | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=622s) 真的是神片，把 Event loop 講的很清楚。

Event loop 就像是讓要求很多的客人先去排另一個隊伍，等要求比較簡單的客人都清空了，再慢慢處理這些奧客！

### Execution Context

我覺得 Prototype Chain、Hoisting、Scope 這幾個主題其實都有一些關聯，像是 Prototype Chain 跟 Scope Chain 都是用類似的方法來繼承父元素。

也就是元素會有個 `Scope` 屬性，用來儲存該元素的相關資訊，在建立一個新的子元素時，先把父元素的 `parentScope` 屬性存起來，再放進新元素的 `childScope` 屬性裡面，而新元素的 `childScope` 就會有自己的屬性資訊，跟父元素的 `parentScope` 屬性內容，如果是 Prototype Chain 則是 `__proto__` 跟 `prototype`。

而這些東西都跟我們宣告的變數跟函式一樣，全都存在 Execution Context 的 Variable Object 或 Activation Object 裡，在研究 Hoisting 時就會稍微了解 Execution Context，所以畫面又更清楚了。

### 參數傳遞

參數傳遞也是我一直有點困惑的點，因為以前大學就學過 Pass By Value 跟 Pass By Reference，甚至還有 Pass By Address，但以前學藝不精，所以也只是大概知道差別，現在學 JavaScript 卻很少聽到這種主題，我好像也沒遇過什麼這方面的問題，就也沒去研究。看了 [深入探討 JavaScript 中的參數傳遞：call by value 還是 reference？](https://blog.huli.tw/2018/06/23/javascript-call-by-value-or-reference/) 才知道，原來 JavaScript 只有 Pass By Value，硬要算的話，還有比較新的說法：Pass By Sharing，才終於比較清楚 JavaScript 的參數傳遞。

### this

以前一直覺得 `this` 是個古靈精怪的鬼東西，所以也一直不想研究，看了 [淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂](https://blog.huli.tw/2019/02/23/javascript-what-is-this/) 才發現，其實大部分的情況都沒有想像中的難，尤其是用 `call()` 的形式來看，就更簡單了！

試著想從規格的角度來看，但是有點太抽象了，雖然可以想像，但沒辦法解釋細節，也不需要太鑽牛角尖，硬要解一些很難的題目，所以大概只要會 `call()` 這個小撇步就可以打遍天下了吧。

記得很久以前不知道哪在哪看到的文章說：脫離物件的 `this` 沒有什麼意義，這句話一直放在心裡，結果原來就是 Huli 老大的文章啊～～

### Closure

以前大概聽過 Closure，但一直把 Callback Function 跟 Closure 搞混，不知道為什麼，沒辦法把「把函式當作參數傳進函式」跟「函式回傳一個函式」分清楚，現在看懂 [所有的函式都是閉包：談 JS 中的作用域與 Closure](https://blog.huli.tw/2018/12/08/javascript-closure/)，才發現根本天差地遠哈哈哈，大概是這幾個禮拜的知識累積，才有了靈魂的昇華吧 XD

## 筆記

- [JavaScript 繼承機制](https://rockyooooooo.coderbridge.io/2021/06/30/javascript-inherit-mechanism/)
- [原型鏈（Prototype Chain）](https://rockyooooooo.coderbridge.io/2021/06/30/javascript-prototype-chain/)
- [筆記：我知道你懂 hoisting，可是你了解到多深？](https://rockyooooooo.coderbridge.io/2021/06/30/note-javacript-hoisting/)
- [筆記：深入探討 JavaScript 中的參數傳遞：call by value 還是 reference？](https://rockyooooooo.coderbridge.io/2021/07/05/note-javascript-call-by-value-or-reference/)
- [筆記：所有的函式都是閉包：談 JS 中的作用域與 Closure](https://blog.huli.tw/2018/12/08/javascript-closure/)
- [筆記：淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂](https://rockyooooooo.coderbridge.io/2021/07/05/note-javascript-what-is-this/)
- [筆記：覺得 JavaScript function 很有趣的我是不是很奇怪](https://rockyooooooo.coderbridge.io/2021/07/05/note-javascript-function-is-awesome/)