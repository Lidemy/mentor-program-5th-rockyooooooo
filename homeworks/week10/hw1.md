## 六到十週心得與解題心得

#### Week6

這週開始接觸很多人心中對前端最一開始的想像－－切版。

對我來說切版有時候甚至比 JavaScript 還要難懂，常常不知道為什麼網頁沒辦法像我期望的方向走，甚至是反過來，連成功了都不知道為什麼。

但經過一些練習之後，大概還是可以掌握一些基本的規則跟概念，所以作業寫起來沒有遇到太多的困難。

hw3 這份作業對我來說幫助非常的大，常常對 `inline`, `block`, `inline-block` 以及 `static`, `relative`, `absolute`, `fixed` 的了解不夠而在 CSS 遇到很多困難，這次的作業讓我好好的研究了這些東西，所以有更多的理解，弄懂這些基礎的東西真的非常重要，不然常常不知道自己錯在哪裡。

Hacker News 的風格比較傳統一點，就是簡單的一些標題跟文章的資訊組成的頁面，全部都是文字組合而成的，所以還蠻簡單的，只是在複製那些文字的時候覺得有點麻煩，因為我不想用假文字，希望他真一點。後來發現原網站竟然完全是用 table 的結構來做的，覺得蠻有趣的，從開始接觸前端開始完全沒有用過 table，也不了解用起來是什麼感覺，感覺是因為後來多了很多很方便的布局方式（例如：flex, grid）之後，使用率就漸漸下降了，但我想可能在哪些時候還是會有需要他的時候（極有可能是使用 IE 時）。

而 Facebook 我就懶得切了哈哈，Facebook 的畫面雖然感覺沒有很難，但可能並不是我想像中那麼簡單，所以我決定暫時跳過。

#### Week7

- hw1 - 透過 `window.scrollTo( behavior: 'smooth' )` 來讓畫面可以用滑的到沒有通過驗證的欄位
- hw2 - 設定 `max-height` 來讓元素伸縮，畫面的其他元素也可以**滑順**的跟著移動
- hw3 - todo list 這個經典的練習，我自己也練習過幾次了，不過這次完全靠自己的力量把每個功能寫出來，對程式碼的簡潔度也還蠻滿意的，未來可以再加入篩選未完成任務的功能。
- hw4 - 在之前就有拜讀過老師寫事件傳遞的文章，所以有一些概念，這次又再加深了印象，之前看 YouTube 在學寫一個 shoping cart 的網站，就有用到 event delegation，那時候覺得非常的酷，覺得自己終於有點工程師的感覺出來了 XD，這次也把這個機制運用在 todo list 上。

其他什麼捕獲階段、冒泡階段、`stopPropagation()` 就不太清楚實作上什麼時候會運用到了，蠻好奇的！

- 挑戰題 Carousel - 我一開始用非常醜的程式碼實作出來，但沒有直接跳轉的功能，雖然覺得很有成就感，但非常硬要的寫法讓我覺得改天一定要好好的整頓一下！後來重構後發現，竟然很簡單就可以寫出來了，我之前到底在忙什麼哈哈，不過 indicator 直接切換的功能就難多了，要考慮的東西比想像中更多，所以花了超過一天的時間才成功寫好。

大概的想法是，用一個變數 `index` 來記錄使用者目前看到的 slide 並把這個 slide 設為 `class="active"`，上一個 slide 設為 `class="prev"`，下一個 slide 設為 `class="next"`，按下左或右按鈕時，`index + 1`（或 `index - 1`，最前時則要直接跳到最後，vice versa），三個 slide 同時移動，移動結束後把 `prev`, `active`, `next` 這三個 class 清除，並依照 `index` 來鎖定當前 slide，在分別設回 `prev`, `active`, `next` 三個 class。而如果是點擊 indicator 的話，則直接把上一個或下一個 slide 換成目標 slide，然後執行跟按下左右按鈕一樣的事情。比較需要注意的是，轉場結束後會重新定位，這時候要 `transition: none`，不然在背後偷偷重新定位這件事就會露餡。

#### Week8

- hw2 - 再戰 Twitch API 感覺就像是我自己自學幾個月來的成果發表，盡量把想的到的功能跟增加使用者體驗的地方都做了出來，還算蠻滿意的，唯獨在 hover 單一實況的時候的動畫效果跟 Twitch 的不太一樣，不過我在 @a_u_z 同學的每日進度看到他有找到別人的寫法，改天可以來試試看。然後之後再做看看 infinite scroll 的版本，以前做過，但一直有問題，感覺現在有能力可以解決了。更新：已加上根 Twitch 一樣的 hover 特效，雖然還有一點瑕疵，但不特別仔細看的話應該看不出來

（在寫 hw2 的時候，一直在 Just Chating 看到穿比基尼在直播的女實況主，害我一直分心，不過真是不錯）

- hw3 - 簡答題開始有點難了（對我來說），對 JSONP 有一點點概念了，但還是沒有什麼畫面，想實作一些實驗來試看看效果，但一時找不到可以用 JSONP 的 API，後來發現老師其實有提到 Twitch API 就有提供 JSONP 的版本，但已經懶得用了 :P

#### Week9

這週開始進入後端，但用的是 PHP，一個我完全沒用過的語言，之前有稍微接觸過用 Node.js 搭配 Express 跟 EJS 來寫後端，資料庫用 MongoDB，而這次資料庫用的是 MySQL，不過不知道為什麼我對 MySQL 好像有點印象，XAMPP 也有印象，不確定是不是以前想自己架天堂私服所以有用到 XD，不過那時只是自己亂用而已，根本什麼都不懂，也不知道自己在幹嘛

PHP 用起來蠻不順手的，雖然邏輯都差不多，迴圈、函式…大部分的東西的用法都一樣，但還是有很多不一樣的地方，而且這些不一樣都讓我有點適應不良。像是變數前面要加 `$`，我很常打成 `%`，然後因為之前經過 eslint 的洗禮，已經習慣行末不加 `;`，現在又要加回來...WTF，但最讓我困擾的是，完全不知道有哪些內建函式可以用，也不清楚要怎麼用，官方文件的風格也不習慣，比較難看懂，所以花了比較多的時間上手。不過總算是可以稍微了解很多前輩說的，會了一個語言之後，要學另一個新的語言不會太難，因為邏輯都是一樣的，只是用的工具不一樣而已。

hw2 的簡答題對我來說也蠻不容易的，餵了 Google 關鍵字 "VARCHAR 跟 TEXT 的差別"，對很多文章都是一知半解，沒有真的實作過就很難真的理解，不過我覺得最重要的差別應該就在 VARCHAR 可以限制長度，而 TEXT 不行。

對 Cookie 跟 Session 也終於有比較了解了，Cookie 就只是存在瀏覽器的小型文字檔案，不是什麼神奇的東西，但卻很有用。而 Session 就是一個機制的名子而已，只要可以達成這個機制，就可以叫作 Session，並不是一個有實體的東西，比較像一個概念。

#### Week10

又到了複習週，回顧前四週的作業跟學習，外加有趣的小挑戰。這次的小挑戰似乎都比較簡單一點，或是我的能力更進步了？幾乎都只要在 devtool 裡面亂翻亂找就找到方法了，只有**r3:0 異世界網站挑戰**的最後一關花了我比較多時間，因為我不想只是輸入符合條件的 token，我試著寫 code 來幫我找 valid token，但結果我試了很久都沒辦法成功，可能是對 PHP 還不夠熟悉吧，最後還是直接找符合條件的 token 來過關。不過 @minw 助教還真用心，把關卡跟畫面設計得這麼精緻，真的很厲害！

-----
很開心參加了這個計畫，讓我可以增進不夠紮實的基礎能力，這一段時間很有方向的在前進，所以很有感的在進步。接下來的幾週感覺會開始學到很多新的東西，希望不要過得太辛苦。