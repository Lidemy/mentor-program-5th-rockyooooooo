
## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

雜湊跟加密最大的差別在於，加密是**可逆的**，雜湊**不可逆**
- 加密
加密很好理解，假設有一段文字，我把密文的每一個字後面都加一個 `*` 符號，得到一串密文，這個過程就可以稱為**加密**，只要把這串密文的 `*` 符號都去掉，我們就可以得到原文，這個過程就是**解密**。
- 雜湊
而雜湊則是把文字經過**雜湊演算法**，來得到**雜湊值**，這個雜湊值是沒辦法用任何方法還原成原本的文字的。
相同的輸入經過雜湊後的輸出一定會一樣，而不同的輸入經過雜湊得到相同的輸出機率**極低**。
但雜湊也不是沒辦法破解，因為相同輸入一定會有相同輸出，所以可以把各種輸入經過雜湊演算法之後的輸出記錄起來，成為一張被稱為**彩虹表**（rainbow table）的對照表，只要我們拿到目標資料庫的雜湊密碼，就可以在彩虹表裡查找相對應的輸入。

密碼加密，只要知道加密的方法，任何人都可以破解你的密碼。
而雜湊的特性，就算別人知道你是用什麼雜湊演算法，並取得你雜湊後的密碼，他還是沒辦法知道你的密碼原本長什麼樣子，所以就算資料庫被入侵了，駭客也沒辦法取得你的密碼。

## `include`、`require`、`include_once`、`require_once` 的差別

`include` 跟 `require` 基本上一模一樣，只差在 `include` 用在 `if...else`、`for` 迴圈、`while` 迴圈之類的流程控制裡
||require|include|
|-|:-:|:-:|
|放在 if...else, for, while 裡|不行|可以|
|引入的檔案發生錯誤時|顯示警告，程式不停止|顯示錯誤，程式立即停止|
|適合引入的內容|靜態內容|動態內容|
而在後面加上 `_once` 則會在引入內容之前，先檢查要引入的內容是不是已經在目前檔案的別的地方引入過了，有的話就不再重複引入


## 請說明 SQL Injection 的攻擊原理以及防範方法

假設在 PHP 裡有一段 SQL 命令長這樣
```php
$sql = sprint(
	"SELECT * FROM users WHERE  username = '%s' AND  password = '%s'",
	$username,
	$password
);
...省略
```
這段命令會把 `$username` 跟 `$password` 照順序把 %s 替換掉，然後在 `users` 這個資料表找出符合 `$username` 跟 `$password` 的資料，所以只要帳號跟密碼的組合錯誤，就找不到資料。
但我們可以在 username 輸入
```php
aa'#
```
整段命令就會變成
```sql
SELECT * FROM users WHERE  username = 'aa'#' AND  password = '$password'
```
`#` 會把後面的字全部當成註解，然後只要在 `#` 前面加上 `'` 就可以把這個命令文字關起來，這樣就可以不用密碼也可以拿到 aa 的資料了。
甚至可以輸入
```php
' OR 1=1#
```
整段命令就變成
```sql
SELECT * FROM users WHERE  username = '' OR 1=1#' AND  password = '$password'
```
這樣就可以把資料表裡面的全部資料都拿出來了！

還有一個做法是，直接在變數塞入一個子命令，例如
```php
$sql = sprint(
	"INSERT INTO comments(name, content) VALUES(%s, %s)",
	$name,
	$content
);
```
第一個 name 先忽略，第二個 content 我們可以輸入
```sql
'), ('admin', 'test
```
假設第一個 name 是 aa，那整段命令就會變成
```sql
INSERT INTO comments(name, content) VALUES('aa', ''), ('admin', 'test')
```
這樣就可以一次新增兩個 comment，而且第二個 comment 可以偽裝成任何人

簡單來說就是利用程式碼的漏洞，用拼接的方式來讓 SQL 指令變成你想要的樣子

#### 防範方法
- 檢查輸入的資料格式，例如用 Regular expression 來處理
- 對輸入的資料做特殊字元的跳脫處理，例如 PHP 的 `mysql_real_escape_string()` 函式
- 避免用拼接的方式產生 SQL 命令，使用參數化查詢，例如 PHP 如下
```php
$conn = new mysqli("localhost", "username", "password", "database");
$stmt = $conn -> prepare("SELECT * FROM users WHERE username=? AND password=?");
$stmt -> bind_param("ss", $username, $password);
$stmt -> execute();
```

##  請說明 XSS 的攻擊原理以及防範方法

利用網頁開發的漏洞，把惡意的程式碼注入到網頁中。
例如一個 todo list 的網頁，使用者可以輸入文字內容來新增 todo，在新增的內容裡輸入以下的內容
```html
<script>alert('123')</script>
```
新增成功後，使用者每次載入這個網站，都會跳出一個訊息為 `123` 的視窗
XSS 甚至可以拿到使用者的隱私資訊，例如瀏覽器的 Cookie

#### 防範方法
- 過濾或替換特殊字元，例如 PHP 的 `htmlentities()` 跟 `htmlspecialchars()`
- 指定 HTTP 標頭類型，避免輸出的內容被當作 HTML 解析，例如在 PHP 使用以下 code
```php
<?php
   header('Content-Type: text/javascript; charset=utf-8');
?>
```

## 請說明 CSRF 的攻擊原理以及防範方法

**跨站請求偽造**（Cross-site request forgery）
有些網站在身分驗證上，只檢查了請求的來源是不是由使用者發出的，而 CSRF 就可以利用這個漏洞，來讓使用者**非自願的**送出請求，達成攻擊者的目的
例如一個刪除文章的按鈕長這個樣子
```html
<a href="./delete?id=2">刪除</a>
```
攻擊者就可以傳一個含有下面的程式碼的網頁給受害者，讓他刪掉文章而自己都不知道
```html
<img src="./delete?id=2" width="0" height="0">
```
因為 img tag 也是用 GET 來發送請求
如果把刪除文章改成用 POST
則可以用 form 來偽裝，發送 POST 請求

#### 防範方法
- 每次離開網頁之前就登出
- 關閉執行 JavaScript，或把 CSRF pattern 的程式碼過濾掉（但應該很難判斷哪些是 CSRF 的惡意程式碼）
- 檢查 Referer，但要注意：
	1. 有些瀏覽器可能不會帶 Referer
	2. 有些使用者會關閉 Referer 功能
	3. 檢查 Referer 的程式碼必須沒有漏洞
- 圖形驗證碼或簡訊驗證碼之類的，每次送出請求就需要輸入驗證碼（很煩）
- 加上 CSRF Token，在 form 裡面加上 hidden 欄位，`name="csrftoken"`，裡面的值由 server 隨機生成，送出請求後，server 只要檢查這個欄位的值是否正確
- Double submit cookie，跟上一個解法相似，差別在於 server 不用儲存任何東西，只要在給 csrftoken 的同時，讓 client-side 設定一個名為 csrftoken 的 cookie，跟 form 裡的值一樣，server 只要檢查這兩個值是不是一樣就可以判斷是不是使用這發的請求了，原因是駭客沒辦法設定別人 domian 的 cookie，但如果他掌握了你底下的任何一個 subdomain，就可以幫你寫 cookie 順利攻擊了。
- Google Chrome 51 的 SameSite Cookie

#### SameSite Cookie
只要在設置 cookie 的 header 後面加上 `SameSite` 就好了，例如
```
Set-Cookie: session_id=ewfewjf23o1; SameSite
```
SameSite 有兩種模式，`Lax` 跟 `Strict`，默認值是 `Strict`，可以自己指定模式
```
Set-Cookie: session_id=ewfewjf23o1; SameSite=Strict
Set-Cookie: foo=bar; SameSite=Lax
```
Strict 模式下，cookie 只有在 samesite 才被允許使用，但這樣太嚴格了，例如朋友傳了一個某網站的連結給你，你點進去會是登出的狀態，還要再另外登入，很不方便
Lax 模式就比較沒那麼嚴格，這個模式下不會限制 GET 的 cookie，其他像是 POST、PUT、DELETE，就不會帶上 cookie，但這樣就要注意 GET 的 CSRF 攻擊