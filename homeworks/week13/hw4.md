## Webpack 是做什麼用的？可以不用它嗎？

### 模組化

在了解 Webpack 之前，要先了解什麼是**模組化**。
以手機為例子（參考自 [webpack 新手教學之淺談模組化與 snowpack](https://blog.huli.tw/2020/01/21/webpack-newbie-tutorial/)）：
如果手機的相機壞掉，你還是可以繼續用你的手機的其他功能，並不會整支手機都不能用；
如果之後想要用手機拍照，就只要把相機修好就好了，不用把整支手機都換掉。
因為相機對於手機來說，只是眾多模組其中的一個模組而已，模組之間不會互相影響。
沒有模組化的話，手機的某一個功能或零件壞掉，可能會整支手機都不能用，要換一支新的手機了。

換成是程式碼的話，就可能會像這樣：

```js
import 相機
import 螢幕
import 原廠電池
import sim卡

Phone.init(相機, 螢幕, 原廠電池, sim卡)
```

模組化還有一個優點，如果你覺得原廠電池太貴了，而且你也可以接受副廠電池的品質，可以直接換成副廠電池，其他地方不用換也沒關係，手機還是可以完美的運行（不考慮副廠電池品質太爛的情況）。

```js
import 相機
import 螢幕
import 副廠電池
import sim卡

Phone.init(相機, 螢幕, 副廠電池, sim卡)
```

這樣大概就是模組化的基本概念，每一個模組只負責一個任務，每個任務互不影響，某個部分有問題，也可以很輕鬆地找到負責的模組來維護。

### Webpack

Webpack 是一個打包工具，主要用來把多個模組打包成較少的 JavaScript 檔（通常只有一個），來讓瀏覽器可以使用，而對 Webpack 來說，任何資源都是模組。

根據 [Webpack](https://webpack.js.org/) 官方文件的介紹

> At its core,  **webpack**  is a  _static module bundler_  for modern JavaScript applications. When webpack processes your application, it internally builds a  [dependency graph](https://webpack.js.org/concepts/dependency-graph/)  which maps every module your project needs and generates one or more  _bundles_.

Webpack 在打包的過程，會建立一個 dependency graph，來記錄每個檔案的依賴關係。也就是說，我們在 HTML 裡只需要引入一個 JavaScript 檔案，而不用把每一個 JavaScript 檔案都引入進來。

### Webpack 的作用

1. 把多個資源引入後打包成一個 JavaScript 檔
2. 使用 npm packages
3. 轉譯 JavaScript ES6（或以上），讓更多瀏覽器可以支援
4. 預處理 SASS（或 SCSS、LESS 等）成 CSS
5. 將 JavaScript 做 uglify 處理
6. 將 CSS 做 minify 處理
7. 還有更多

簡單來說，Webpack 就是一個可以幫我們做很多事情的工具，如果不用 Webpack，我們就要自己把每一個 JavaScript 檔引入 HTML，自己把 JavaScript ES6 語法用 Babel 轉譯，自己把 SASS 預處理成 CSS，自己把程式碼 uglify、minify……等。

而這些工作，只要設定好 webpack 的設定檔，通通只要一行指令就可以搞定：`npm run build`。

## gulp 跟 webpack 有什麼不一樣？

### Gulp

一樣來看看 [Gulp](https://gulpjs.com/) 官方的簡介。

> A toolkit to automate & enhance your workflow
> Leverage gulp and the flexibility of JavaScript to automate slow, repetitive workflows and compose them into efficient build pipelines.
>
>Gulp 是一個自動化且增強你的工作流程的工具包，
利用 Gulp 和 JavaScript 的彈性來把費時、重複的工作流程組成有效率的 build pipelines。

這樣看好像沒什麼感覺，直接來看範例好了。

```js
const gulp = require('gulp')  // 將 node_modules 的檔案載入
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
	
gulp.task('sass', () => {  // 定義任務名稱及任務內容
  return gulp.src('./scss/*.scss')  // 來源資料夾
    .pipe(sass().on('error', sass.logError))  // 執行 sass 預處理
	.pipe(gulp.dest('./stylesheets'))  // 匯出資料夾
})

gulp.task('sass:watch', () => {
  gulp.watch('./scss/*.scss', ['sass'])  // 監聽資料夾，有資料夾內有變更時執行 'sass' 任務
})

gulp.task('minify-css', () => {
  return gulp.src('./stylesheets/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'})) // 執行 css minify
    .pipe(gulp.dest('dist'))
})
```

在上面的程式碼，我們定義了三個任務

1. `sass` - 將目標資料夾裡的 scss 檔預處理成 css 檔
2. `sass:watch` - 監聽目標資料夾，有變更時會執行 `sass` 任務
3. `minify-css` - 將目標資料夾裡的 css 檔 minify

我們只要在 Terminal 輸入 `gulp 任務名稱`，就可以執行對應的任務，甚至可以將兩個以上的任務組合成一個新的任務，但這邊只想簡單介紹，就不提供範例了。

也就是說，Gulp 是一個任務管理工具，可以自由定義、組合任務。

### Gulp 和 Webpack 的差別

Webpack 是一個**模組化打包工具**，而 Gulp 則是**任務管理工具**，Webpack 主要目的是把模組化的資源打包在一起，打包的過程可以處理一些你在設定檔裡面設定好的事情，而 Gulp 你可以依照當下的情況執行需要的任務，不用明明只是修改 SCSS 檔，卻要 Babel 全部的 JavaScript 檔，甚至可以把 Webpack 定義成一個 Gulp 的任務。

## CSS Selector 權重的計算方式為何？

### Specificity 優先級

CSS Selector 的權重有分三個優先級 （Specificity，下面用等級來取代，感覺比較好懂），由高到低排序：

1. ID Selectors(`#example`)
2. Class Selectors(`.example`), Attributes Selectors(`[type="radio"]`), Pseudo-Classes Selectors(`:hover`)
3. Type Selectors(`h1`), Pseudo-Elements(`::before`)

而 Universal Selector(`*`) ，Combinators(`+`, `>`, `~`, ` `, `||`)，Negation Pseudo-class(`:not`) 則不影響權重（但在`:not()`裡面的選擇器會影響權重）

我們將這三個等級的數量用 x-x-x 來排列：

- n-0-0 代表有 n 個 ID Selector
- 0-n-0 代表 Class Selectors, Attributes Selectors, Pseudo-Classes 共有 n 個
- 0-0-n 代表 Type Selectors 或 Pseudo-Elements 共 n 個

再來看看 [W3C](https://drafts.csswg.org/selectors-3/#specificity) 給的範例

```css
*               /* a=0 b=0 c=0 -> specificity =   0 */
LI              /* a=0 b=0 c=1 -> specificity =   1 */
UL LI           /* a=0 b=0 c=2 -> specificity =   2 */
UL OL+LI        /* a=0 b=0 c=3 -> specificity =   3 */
H1 + *[REL=up]  /* a=0 b=1 c=1 -> specificity =  11 */
UL OL LI.red    /* a=0 b=1 c=3 -> specificity =  13 */
LI.red.level    /* a=0 b=2 c=1 -> specificity =  21 */
#x34y           /* a=1 b=0 c=0 -> specificity = 100 */
#s12:not(FOO)   /* a=1 b=0 c=1 -> specificity = 101 */
```

按照我們剛剛的算法，可以計算出範例裡的每個 Selector 的權重

- `*` 不影響權重，所以是：0-0-0
- 一個 Type Selector，所以是：0-0-1
- 兩個 Type Selectors，所以是：0-0-2
- `+` 不影響權重，所以是三個 Type Selectors：0-0-3
- `*`, `+` 不影響權重，一個 Type Selector，一個 Attribute Selector：0-1-1
- 三個 Type Selectors，一個 Class Selector：0-1-3
- 一個 Type Selector，兩個 Class Selectors：0-2-1
- 一個 ID Selector：1-0-0
- `:not` 不影響權重，但它裡面的選擇器會，所以是一個 ID Selector，一個 Type Selector：1-0-1

高等級不會被低等級超越，所以就算有一百個 Type Selectors 也不會比一個 ID Selector 優先，而如果兩個選擇器的權重相等，則會優先套用排列在比較下面的選擇器。

### inline style 和 `!important`

inline style 就是直接在 HTML 元素上寫 style，例如：

```html
<h1 style="color: red">Hello World</h1>
```

inline style 永遠會覆寫 CSS 裡面的樣式，所以可以想像成 inline style 有最高的等級：1-0-0-0

而 !important 則是不鳥權重，直接套用（單押 *1），也可以想像成他比 inline style 有更高的等級：1-0-0-0-0

Note：inline style 的 1-0-0-0 跟 `!important` 的 1-0-0-0-0，都是我們可以這樣想像，但其實 W3C 並沒有對他們做權重的設計

參考來源：

- [Webpack 官網](https://webpack.js.org/)
- [關於 Webpack，它是什麼？能夠做什麼？為什麼？怎麼做？— freeCodeCamp 的筆記](https://askie.today/what-is-webpack/)
- [Webpack Tutorial 繁體中文 Gitbook](https://neighborhood999.github.io/webpack-tutorial-gitbook/Part1/)
- [webpack 新手教學之淺談模組化與 snowpack](https://blog.huli.tw/2020/01/21/webpack-newbie-tutorial/)
- [Gulp 官網](https://gulpjs.com/)
- [Gulp 安裝與介紹](https://ithelp.ithome.com.tw/articles/10185420)
- [鐵人賽 10 - Gulp 與 Sass 開發環境](https://wcc723.github.io/css/2016/12/10/gulp-init/)
- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
- [MDN - CSS Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
- [CSS Specificity / 權重](https://ithelp.ithome.com.tw/articles/10240444)
- [specifishity](https://specifishity.com)
- [CSS Specificity](https://cssspecificity.com)
- [W3C - Selectors Level 3](https://drafts.csswg.org/selectors-3/#specificity)