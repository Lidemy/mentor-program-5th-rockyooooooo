# 短網址系統設計

> 請你畫出一張短網址服務的後端系統架構圖，越詳細越好，可以考慮到如何增進效能、scaling 以及備份資料。

## 短網址

### 什麼是短網址

一般的網址常會很長很複雜，在分享網址時會佔太大的篇幅，或是影響美觀，可以利用短網址服務來讓網址縮短。

範例：

```url
https://hackmd.io/@allenliao/B1jGk4wsO
```

縮完之後會變這樣：

```url
https://ppt.cc/fbp1ux
```

網址幾乎只有原本的一半，如果原本的網址更長的話，效果會更明顯，像是有些含有中文的網址，因為編碼關係，中文可能會變成一大串特殊符號，這樣在分享網址時就特別適合用短網址。

### 基本原理

其實短網址並不是**真的把原本的網址縮短**了，原本的網址還是可以用，而是伺服器會根據演算法，產生一個較短且獨一無二的網址，並存到資料庫，當使用者輸入這個短網址，伺服器會去資料庫找這個短網址對應的是哪一個網址，然後幫使用者轉址到正確的頁面。

## 系統架構

### 產生短網址

使用者輸入一串網址，伺服器要回傳一串獨一無二且無法預測的短網址。

![basic](https://i.imgur.com/f8c5Rlr.png)

### 單點故障（Single Point Of Failure）

目前的設計，如果其中一個 Server 或是 Database 掛了，我們的短網址服務就無法使用了，所以 Server 跟 Database 都不能只有一個。再加上 Load Balancer 來進行分流，Load Balancer 當然也不能只有一個。

![SPOF](https://i.imgur.com/lcGOalB.png)

### 短網址還原

我們再加上還原短網址的流程，用淺藍色的線條來表示。

![retrieve](https://i.imgur.com/C1sx69z.png)

1. 使用者在網址列輸入：`https://ppt.cc/fbp1ux`
2. 伺服器向資料庫詢問這串短網址的原網址，得到：`https://hackmd.io/@allenliao/B1jGk4wsO`
3. 幫使用者轉址到原網址

### Cache

我們可以將使用者用過的短網址先存在 Cache 裡，下次使用者輸入短網址時，就可以從 Cache 裡找到原網址，有找到就不用到資料庫找了，提升效率。

![cache](https://i.imgur.com/o9C43wV.png)

1. 使用者在網址列輸入：`https://ppt.cc/fbp1ux`
2. 伺服器到 Cache 找這串短網址的原網址
3. - 找到原網址
      1. 得到：`https://hackmd.io/@allenliao/B1jGk4wsO`
      2. 幫使用者轉址到原網址
    - 找不到原網址
      1. 伺服器到資料庫找這串短網址的原網址
      2. - 找到原網址
            1. 得到：`https://hackmd.io/@allenliao/B1jGk4wsO`
            2. 幫使用者轉址到原網址
          - 找不到原網址 - 回傳 HTTP 404 給使用者

### 其他改善方向

#### Key Generations Service

預先產生一些隨機且唯一的 Key，存到專門存放這些 Key 的資料庫（Key-DB），每當需要產生新的短網址時，只要從這個資料庫拿取後加上就好了，不但可以加快速度，也可以保證短網址不重複。

#### 資料庫複寫（Replication）與讀寫分離

其中一個資料庫當作 Master，剩下的當作 Slaves，任何需要變動到資料庫裡的資料都在 Master 完成，再同步到每個 Slaves，而 Slaves 就只要負責讀取資料的工作就好。

#### 刪除過期短網址

如果不斷的檢查過期的短網址來清除他們，會給伺服器很大的負擔。

我們可以設定短網址的過期時間，如果使用者要訪問一個過期的短網址，就回傳給他 HTTP 404，並刪除該短網址。也可以每隔一段時間就清除那些過期的短網址，當然要在流量比較低的時候才做這件事。

短網址被刪除後，要把該短網址的 Key 釋放，讓 Key-DB 可以再次使用這些 Keys。

## 參考資料

- [Designing a URL Shortening service like TinyURL](https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR)
- [系統設計 - 設計縮網址服務 - jyt0532's Blog](https://www.jyt0532.com/2019/12/05/design-tiny-url/)
- [短网址(short URL)系统的原理及其实现](https://hufangyun.com/2017/short-url/)
- [系統設計101—大型系統的演進（上）](https://medium.com/%E5%BE%8C%E7%AB%AF%E6%96%B0%E6%89%8B%E6%9D%91/backend-architecture-101-5c425e760a13)
- [Canva](https://www.canva.com/)
