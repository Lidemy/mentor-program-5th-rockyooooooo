## 請簡單解釋什麼是 Single Page Application

傳統網頁設計模式大多是 Multi Page，使用者點擊一個按鈕後重新載入另一個頁面，Server 接收到請求後會把整個頁面回傳給 Client，這樣的缺點很明顯
1. 不管需要更新的地方多小，都要重新載入一整個頁面
2. Client-Server 間的傳輸比較費時
3. 使用者體驗較差

Single Page Application 就跟字面上的意思一樣，單頁應用程式，簡稱 SPA。

SPA 在第一次請求時 Server 會回傳整個 HTML，但接下來的請求，Server 只會回傳單純的資料（例如 JSON 格式的資料），畫面跟邏輯則交給 Client-side 處理，動態改變頁面上的內容，且只更新需要被更新的部分，不須跳轉到新的頁面。

## SPA 的優缺點為何

#### 優點
- 更新頁面時只更新必要部分，不用重複載入其他一樣的部分
- 因為 UI 給 Client-Side 負責，不用再透過 Server，頁面的反應會比較快
- 降低 Client-Server 間傳送資料的大小
- 有如桌面應用程式般的良好使用體驗
- 減輕 Server 負擔

#### 缺點
- 在第一次進入頁面時，Server 會把整個 HTML 都傳給 Client，所以第一次載入會比較久
（可以採用 Lazy Loading 來加快，在需要時才載入部分片段，不須一次載入全部）
- 動態載入的內容在 SEO 上會有問題，主流的網路搜尋引擎的爬蟲沒有辦法執行 JavaScript
（Server 可以建立一個基於 HTML 的網站版本，並提供爬取工具，或是用Headless Browser 例如 PhantomJS，執行 JavaScript 並輸出生成的 HTML）
- 沒有在瀏覽器中啟用 JavaScript 的使用者存取不了頁面
- 瀏覽器歷史紀錄的前進後退功能，可能會跟預期的結果不一樣。
（HTML5 引入了 pushState 跟 replaceState，可以解決這個問題）

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

之前的作業，每次新增、編輯或刪除留言等，都需要不斷的跳轉新的頁面，而這個頁面由 Server 產生，Client 只負責顯示，也就是 Server-side render(SSR)。

這樣的方式讓頁面在瀏覽器每次發送請求之後，都要等 Server 重新計算並產生頁面，再回傳給 Client 來顯示，影響使用者體驗，也增加了 Server 的負擔。

這週 Server 只會回傳資料的 API，新增、編輯跟刪除等功能，都是直接在同一個頁面完成，由瀏覽器發出請求，根據 Server 回傳的資料來決定 render 的畫面，且只更新需要被更新的部分。這樣把 render 工作從 Server-side 移到 Client-side 的模式，叫做 Client-side render(CSR)。

如此一來可以把畫面的 render 交給前端，後端只要負責輸出資料，來達到前後端分離。

-----
#### 參考資料
- [維基百科 - 單頁應用](https://zh.wikipedia.org/wiki/%E5%8D%95%E9%A1%B5%E5%BA%94%E7%94%A8)
- [單一頁面應用程式](https://mybaseball52.medium.com/%E5%96%AE%E4%B8%80%E9%A0%81%E9%9D%A2%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F-c98c8a17081)
- [Day20– 前端小字典三十天【每日一字】– SPA](https://ithelp.ithome.com.tw/articles/10160709)
- [Frontend Engineering－認識 Single Page Application（SPA）](https://www.jollen.org/blog/2014/09/single-page-application.html)
- [What Is a Single Page Application and Why Do People Like Them so Much?](https://www.bloomreach.com/en/blog/2018/07/what-is-a-single-page-application.html)
- [前後端分離與 SPA](https://blog.techbridge.cc/2017/09/16/frontend-backend-mvc/)