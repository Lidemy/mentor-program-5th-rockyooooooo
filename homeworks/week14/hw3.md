## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

DNS(Domain Name System)，網域名稱系統。

### 網域名稱（Domain Name, Domain），簡稱域名、網域

因為 [IP 位址不容易記憶](#IP-位址)，所以我們通常用域名來代替，可以說域名是一個 IP 位址的別名，例如我們可以在網址列輸入 `www.google.com`，就可以連結到 Google 首頁，而不用記得 Google Server 的 IP 位址：`172.217.27.132`

#### 網域層級

域名通常有兩個以上的部分組成，用 `.` 分隔，以 `www.google.com` 為例，最右邊的 `com` 是頂層網域，中間 `google` 是第二層網域，最左邊 `www` 是第三層網域

- **根區域** - DNS 網域命名空間內的頂層網域，包含所有網際網路網域
- **頂層網域** - 根區域的子網域，又分為一般頂層網域（如：`.com`, `.org`）及國家 / 區域代碼頂層網域（如：`.tw`, `.us`）
- **第二層網域** - 頂層網域的子網域
- **第三層網域** - 第二層網域的子網域，依此類推

子網域的名稱會包含所屬網域的名稱，例如：`www.google.com` 是 `google.com` 的子網域，`google.com` 是 `.com` 的子網域，而所有網域都是根網域的子網域。

### IP 位址

在網路的世界裡，每個連上網路的裝置（可以是電腦、手機、印表機等等）都會有一組自己的 IP 位址，而裝置之間可以靠 IP 位址來連線。就像打電話一樣，每張 SIM 卡都會有一組電話號碼，裝到手機上就可以輸入其他的電話號碼來通話。

IP 位址通常會以 `172.16.254.1` 這樣一串數字的形式出現，更詳細的說，這是一組 IPv4 位址，而因為 [IPv4 位址的枯竭](https://zh.wikipedia.org/wiki/IPv4%E4%BD%8D%E5%9D%80%E6%9E%AF%E7%AB%AD)，又出現了長得像 `2001:db8:0:1234:0:567:8:1` 這樣子的 IPv6 位址。

但不管是 `172.16.254.1` 或是 `2001:db8:0:1234:0:567:8:1`，人類都很難記得或是辨識，所以我們通常都是用 DNS 來連接網路的。

### DNS 運作方式

DNS 的運作方式其實就像是在不斷地查電話簿，直到查到目標的電話號碼（IP 位址）。

1. 使用者在瀏覽器的網址列輸入 `www.google.com` 並送出
2. 這個請求會送到使用者的網際網路服務提供者（ISP，例如：中華電信 HiNet）的網域解析程式（DNS Resolver）
3. ISP 的 DNS Resolver 會先檢查該網域是不是在自己的網域底下，是的話回傳結果，不是的話會再檢查自己的快取有沒有紀錄，有的話回傳結果，沒有的話向根名稱伺服器發送請求
4. ISP 的 DNS Resolver 把請求轉送給根名稱伺服器，根名稱伺服器會回傳負責 `.com` 這個頂層網域的 DNS 伺服器的 IP 位址
5. ISP 的 DNS Resolver 再把請求轉送給負責 `.com` 的 DNS 伺服器，得到負責 `google.com` 這個網域的 DNS 伺服器的 IP 位址
6. ISP 的 DNS Resolver 再把請求轉送給負責 `google.com` 的 DNS 伺服器，得到負責 `www.google.com` 這個網域的 DNS 伺服器的 IP 位址
7. ISP 的 DNS Resolver 再把請求轉送給負責 `www.google.com` 的 DNS 伺服器，該伺服器找到 `www.google.com` 的 IP 位址並回傳給 DNS Resolver
8. ISP 的 DNS Resolver 把得到的 IP 位址回傳給使用者的瀏覽器，並顯示畫面

### Google Public DNS

由 Google 推出的免費網域解析服務，Google 表示是為了提升網路瀏覽速度、網路使用體驗跟安全性（有這麼好的事？）。

![Google Public DNS](https://i.imgur.com/TXcATa7.png "Google Public DNS")

#### [性能優勢](https://developers.google.com/speed/public-dns/docs/performance#provision)

當我們對某件事不清楚時，別人常常會建議你 **google it**。

因為 Google 強大的搜尋引擎，google 已經成為了搜尋的代名詞。所以 google 搜尋引擎每天都在抓取非常多的 DNS 資訊，所以 google 可以將這些資料快取，就不用再翻電話簿了。

在影響 DNS 查詢速度的各種因素中，Google 認為 Cache misses（快取失效）是最主要的，他們提供幾點改善方案

1. 部署足夠的 DNS 伺服器
2. 避免阻斷服務攻擊擴大規模
3. 有效利用負載平衡機制將 DNS 集中快取
4. 積極地預先取得名稱解析
5. 在全球部署 DNS 伺服器以提供服務

#### [安全優勢](https://developers.google.com/speed/public-dns/docs/security)

Google 是全球知名的大公司，他們的服務也在世界各地都非常多人使用，因此他們對於安全性有相對高的要求。

對於像是 Cache poisoning attacks, DoS and amplification attacks ... 等攻擊，他們也提出了幾點改善方案

（太難了啃不下去，所以直接上圖片）

![](https://i.imgur.com/Re3MKkH.png)

#### 疑慮

然而 Google 不可能在每個國家、每個地區都有伺服器，Google 伺服器可能會離你很遠，甚至就算你離他夠近，在 Google Public DNS 快取中的 IP 也不一定是離你最近的 IP。

而且 Google 有可能這麼佛心的提供像他們說的這麼好的服務，卻一毛錢都不像使用者收嗎？

我相信 Google 一定是看準了這樣可以蒐集使用者平常愛逛什麼網頁，來投放更多更精準的廣告🤣

## 什麼是資料庫的 lock？為什麼我們需要 lock？

當多人同時存取資料庫的同一筆資料的時候，可能會造成資料的讀取或儲存部正確。

例如有一個資料表裡存著門票的數量，假設數量只有一張，當有十個人同時要購買這張門票，這十個人可能都看會到門票存量一張，且同時購買成功，導致超賣的情況。

而 lock 就是在有人正在存取某個資料時，讓其他想存取同一個資料的人等待的機制。

所以當有一個人正在購買那唯一一張門票時，其他人就只能等待，如果他購買成功，其他人就沒辦法再購買了，而如果他購買失敗，門票就會釋放出來，給下一個幸運兒進入交易，並讓剩下的人繼續等待。

## NoSQL 跟 SQL 的差別在哪裡？

### SQL

Structured Query Language，結構化查詢語言，用來管理關聯式資料庫管理系統（RDBMS），包含資料定義語言（DDL）、資料操作語言（DML）、資料控制語言（DCL）及事務控制語言（TCL）。

- **資料定義語言（DDL, Data Definition Language）**
  用來定義資料庫結構的指令，例如：
  - CREATE
  - ALTER
  - DROP
- **資料操作語言（DML, Data Manupulation Language）**
  用來操作資料庫裡的資料的指令，例如資料的 CRUD：
  - SELECT
  - INSERT
  - UPDATE
  - DELETE
- **資料控制語言（DCL, Data Control Language）**
  用來控制資料庫的使用權限的指令，例如：
  - GRANT
  - REVOKE
- **事務控制語言（TCL, Transation Control Language）**
  管理資料庫中交易的指令，例如：
  - START TRANSATION
  - COMMIT
  - ROLLBACK

#### 關聯式資料庫

將資料以表格的方式存在資料庫，稱為資料表。

|姓名|學號|班級|
|---|---|---|
|億載金城武|A201|一年甲班|
|王金平底鍋|A202|一年乙班|
|李奧納多皮卡丘|A101|二年甲班|

每一行資料的每個欄位都會分別跟每個屬性對應。

### NoSQL

最初是 Non-SQL, 後來大多認為是 Not Only SQL，不同於傳統的關聯式資料庫的資料庫管理系統的統稱。部分資料可以用 SQL 系統儲存，其他資料可以用 NoSQL 系統來儲存，可以不用有固定的表格欄位，更避免了 SQL 的 JOIN 操作。

可以處理分散式檔案，主要用 Key-Value 的形式來展現

```json
[
  {
    "name": "億載金城武",
    "age": 47,
    "japanese_name": "Takeshi Kaneshiro"
  },
  {
    "name": "王金平底鍋",
    "age": 80,
    "political_party": "KMT"
  },
  {
    "name": "李奧納多皮卡丘",
    "age": 46,
    "species": "Mouse Pokémon",
    "fighting_style": "Electric"
  }
]
```

每筆資料可以有著數量不同、種量也不同的屬性，就像是 JSON 格式一樣。

#### NoSQL 優點

- 彈性
- 擴展性
- 高效能
- 高功能性

## 資料庫的 ACID 是什麼？

資料庫在更新資料時，為了保持 Transation 正確可靠，必須具備四種特性

1. **Atomicity 原子性**
  一個 Transation 中的所有操作，只有全部完成或全部不完成，只要 Transation 中有其中一個操作發生錯誤，整個 Transation 的操作就像沒有發生過。
2. **Consistency 一致性**
  Transation 完成前後，資料庫的完整性不會被破壞。
3. **Isolatio 隔離性**
  資料庫可以同時有多個 Transations ，且確保 Transations 間不會互相影響，導致數據不一致
4. **Durability 持久性**
  Transation 完成後，對資料的更動就是永久的，不會因為系統故障或錯誤而改變。

### 範例

A 要轉帳給 B 100 塊，資料庫至少要有兩個操作

1. A 的帳戶減少 100 塊
2. B 的帳戶增加 100 塊

這兩個操作只要其中一個發生錯誤，就會兩個都不完成，Rollback 回交易前的狀態，不可以有 A 的帳戶少了 100 塊，B 的帳戶卻沒有多 100 塊之類的情況。 -- 原子性

轉帳完前後，A 跟 B 的存款總額不變，不可以轉帳完，兩人的存款總合多了 100 或少了 100。 -- 一致性

A 跟 B 交易的同時，假設 C 跟 D 也正在交易，兩個交易互不影響，交易完成後的結果一致。 -- 隔離性

交易完成後，不管系統故障或錯誤，這 100 塊都不會回到 A 的帳戶。 -- 持久性

## 參考資料

### DNS

- [域名系統](https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F)
- [IP位址](https://zh.wikipedia.org/wiki/IP%E5%9C%B0%E5%9D%80)
- [域名](https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D)
- [DNS 說明](https://support.google.com/domains/answer/3251148?hl=zh-Hant#zippy=%2Cip-%E4%BD%8D%E5%9D%80%2Cdns-%E5%91%BD%E5%90%8D%E7%A9%BA%E9%96%93)
- [什麼是 DNS？ | DNS 的工作方式](https://www.cloudflare.com/zh-tw/learning/dns/what-is-dns/)
- [什麼是 DNS？](https://aws.amazon.com/tw/route53/what-is-dns/)
- [DNS的運作？](http://dns-learning.twnic.net.tw/dns/03opDNS.html)
- [Google Public DNS](https://zh.wikipedia.org/wiki/Google_Public_DNS)
- [使用 Google Public DNS 服務，上網速度不一定會變快！](https://blog.miniasp.com/post/2009/12/08/Use-Google-Public-DNS-may-not-surfing-faster-as-you-expected)

### 資料庫

- [[進程。Processing] 24.鎖定(Lock)](https://ithelp.ithome.com.tw/articles/10106976)
- [SQL](https://zh.wikipedia.org/wiki/SQL)
- [SQL指令及主要分類(DDL, DML, DCL, TCL)](http://blog.bod.idv.tw/2019/09/sqlddl-dml-dcl-tcl.html)
- [NoSQL](https://zh.wikipedia.org/wiki/NoSQL#cite_note-2)
- [SQL是什麼? 初學者必須知道的懶人包](https://kuochingsouthen.com/what-is-sql/)
- [什麼是 NoSQL？](https://aws.amazon.com/tw/nosql/)
- [ACID](https://zh.wikipedia.org/wiki/ACID)
- [MySQL 基本運作介紹，從資料庫交易與 ACID 特性開始](https://tw.alphacamp.co/blog/mysql-intro-acid-in-databases)
- [資料庫交易](https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BA%8B%E5%8A%A1#cite_note-acid-3)
- [資料庫的ACID（原子性、一致性、隔離性與永續性）](https://www.itread01.com/content/1543083667.html)

###### tags: `Lidemy-MTR05`, `Week14`
