## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

TEXT：
- 最大長度固定是 65535 個 characters，無法限制最大長度
- 佔用 (n + 2) bytes 的空間，n 為字串長度
- 不能完全是索引的一部份，須給定前綴索引長度（prefix index length）
- 查詢速度較慢
- 使用時機：
  - 要存放的內容長度不確定
  - 不需要每一列的索引

VARCHAR：
- 最大長度可變，最多到 65535 個 characters
- 如果 characters < 256 個，佔用 (n + 1) bytes 空間；如果 characters >= 256 個，佔用 (n + 2) bytes 空間。n 為字串長度
- 可以是 index 的一部分
- 查詢速度較快
- 使用時機：
  - 明確知道要儲存的長度限制
  - 需要每一列的索引


## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

因為 HTTP 是一個無狀態協議（Stateless Protocol），所以對 Server 來說，Client 的每次請求都是不一樣的，Server 沒辦法分辨每次請求之間的關係

既然如此，假設有一個網站有會員系統，那 Server 要怎麼分辨 Client 是不是處於登入狀態呢？這時候 Cookie 就派上用場了，Cookie 是存在瀏覽器裡面的小型文字檔案

Cookie 主要有三個目的：
- Session 管理
- 個人化設定
- 紀錄並分析使用者行為

當 Client 成功登入帳號，Server 可以透過 Set-Cookie 這個 response header 來讓瀏覽器保存起來，當下次 Client 再次發送請求時，瀏覽器就會附上這個 Cookie，
這樣 Server 就可以根據 Cookie 來檢查 Client 是不是有登入了

也可以用在使用者的個人化設定，或是 Server 要根據使用者的行為來投放廣告...等等


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

- 使用者可以在留言輸入 HTML tags 或 JavaScript 語法，我有用 `htmlentities()` 來避免
- 使用者註冊帳號時，可以在 input 裡加入 HTML tags 或 JavaScript 語法，我有做簡單的檢查來避免
- 密碼為明文，如果資料庫遭到入侵，就可以拿到正確密碼，可以用對稱加密或非對稱加密來把密碼轉換成密文
- 判斷登入身分是用 Cookie 裡面存的 username，把 Cookie 裡的 username 改掉就可以偽裝成別人來登入