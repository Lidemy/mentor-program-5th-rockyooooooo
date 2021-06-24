# 用 DigitalOcean 來部署網站吧

- [Todolist](http://allenliao.tw/todolist/)
- [Twitch 直播列表](http://allenliao.tw/twitch-live-streams/)
- [留言板](http://allenliao.tw/board/)
- [部落格](http://allenliao.tw/blog/)

## 心得

其實一直到現在對 CLI 還是有一點點排斥，畢竟很多指令都不懂，每個指令甚至都還有各種 flags 跟參數，光是看一行指令根本也猜不太到是做什麼用的。

然而用虛擬主機部署網站大部分都要用 CLI 來操作，只能一直 google，跟著別人的教學，把每一行指令複製貼上，當然教學都會稍微說明一下那行指令做了什麼事，但總會想知道指令的每一個部分到底確切代表什麼意思，至少出現錯誤也比較知道怎麼排除（確定會有幫助？）。

其實部署的過程最難的原因大概就是對 Linux 系統及 CLI 的不熟悉吧！除了要對設定檔跟 DNS 做一些修改跟設定，剩下的就只是在另外一台電腦做跟第九週一樣的事情而已，只是用自己不習慣的操作介面就把整件事都變不一樣了（尤其是 CLI）。遇到困難的時候只能不斷的 google，google 完可能還是一頭霧水，根本不知道他們在公三小，只能一直複製貼上一直試，直到成功為止。

~~然後還是一頭霧水~~

幸運的是，部署的過程沒有遇到太多問題，大多都跟著查到的教學走就成功了。原本也想要整理一篇自己的簡易部署教學，但仔細想想，我跟著別人的教學也沒遇到什麼問題，與其自己寫一篇幾乎一模一樣的文章，不如直接把人家整理得妥妥當當的資源貼上來就好，頂多就是把自己遇到的問題跟解決的方法真實的記錄下來。（不過或許有一天還是會整理一篇自己的流程，畢竟別人的文章哪一天突然不見了，需要的時候找不到就頭痛了。）

## 註冊 DigitalOcean 帳號

我是直接用 GitHub，驗證後就會直接登入了

![](https://i.imgur.com/lF72Dk2.png)

再來就可以建立新的虛擬主機了

![](https://i.imgur.com/B4P2gpR.png)

DigitalOcean 的虛擬主機叫做 Droplets，查了一下意思是

> a small drop of liquid

所以是很小滴的液體？有趣

![](https://i.imgur.com/ZtabhAG.png)

選擇主機的作業系統，這邊可以直接選擇 DigitalOcean 提供的 LAMP One-Click Droplets，除了安裝作業系統，也會幫我們把 LAMP 也準備好

![](https://i.imgur.com/fBBhCiZ.png)

選擇方案，當然是最便宜的就好，要選貴的我也不會有意見

![](https://i.imgur.com/gZyJOVC.png)

選擇雲端主機的位置，選一個離你最近的國家就好了，離台灣最近的就是新加坡

![](https://i.imgur.com/C9BZc5V.png)

設定密碼，可以設定 SSH Keys 安全性比較高，不過我先用 Password 就好

![](https://i.imgur.com/1WLra2M.png)

這邊可以改成比較好分辨的虛擬主機名稱

![](https://i.imgur.com/a1y9ko7.png)

## 連線到虛擬主機

### Terminal

打開 Terminal，輸入 `ssh root@你的虛擬主機 IP` 後，輸入剛剛設定的密碼

看到這樣的畫面就表示連線成功囉！

![](https://i.imgur.com/6enmmFN.png)

## 初始化 Apache

完全依照 [How To Set Up Apache Virtual Hosts on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-18-04) 的指示

## 安裝 phpmyadmin

完全依照 [How To Install and Secure phpMyAdmin on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-20-04) 的指示

## 把寫好的程式碼傳到虛擬主機

完全依照 [How to Transfer Files to Droplets With FileZilla](https://docs.digitalocean.com/products/droplets/how-to/transfer-files/) 的指示

其實就跟第九週交作業的連線一樣，只是這次的連線方式是 SFTP，然後程式碼放的位置跟初始化 Apache 時做的範例同個資料夾。

## DNS 設定

- DigitalOcean 設定 Domains
- gandi 設定名稱伺服器

[爲你的Server綁定網域(domain)](https://morrisctech.com/2018/08/21/bind_domain/)

## 遇到的問題

### 安裝 phpmyadmin

一開始沒有用 LAMP One-Click Droplets，在安裝 phpmyadmin 設定 root 密碼時，出現錯誤

![](https://i.imgur.com/pYzhp3M.png)

不知道怎麼離開這個畫面，於是我把整個 Terminal 關掉重來。

結果因為上次的安裝未完成，所以出現錯誤沒辦法再安裝一次，照[這個方法](https://askubuntu.com/questions/1109982/e-could-not-get-lock-var-lib-dpkg-lock-frontend-open-11-resource-temporari)來解決

這次一樣到設定 root 密碼又出現一樣的錯誤，於是 google 看看這個錯誤到底是怎麼造成的

查到[這篇討論](https://stackoverflow.com/questions/11657829/error-2002-hy000-cant-connect-to-local-mysql-server-through-socket-var-run)，原來是因為沒有安裝 mysql-server，照連結說的做看看

結果還是遇到一樣的問題，算了，把主機砍掉重來，改試看看 LAMP One-Click Droplets

### Domain

購買了 Domain 之後，完全不知道怎麼用，以為買完後在網址上面打上自己的 Domain 就可以用了，結果只會提示你這個網域已經被註冊了。

![](https://img.sur.ly/thumbnails/620x343/f/fakes.top.png)

很可愛的圖，可惜我忘記截圖了，只找到網路上這張糊糊的圖

回頭看[How To Set Up Apache Virtual Hosts on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-18-04)有提到可以參考[How to Add Domains](https://docs.digitalocean.com/products/networking/dns/how-to/add-domains/)來新增 Domains，並照著裡面的指示繼續看[How to Create, Edit, and Delete DNS Records](https://docs.digitalocean.com/products/networking/dns/how-to/manage-records/)，結果還是沒辦法成功

#### 解決

後來看到[這篇文章](https://morrisctech.com/2018/08/21/bind_domain/)，才知道原來 自己的 Domain 那邊也要設定，照著文章的指示就成功了！

### phpmyadmin 資料表匯入

懶得重新把打資料表，所以想說來試看看用匯出匯入的，先是一個資料表，成功匯入，於是把剩下的資料表也一口氣匯入，匯入後竟然每個剛匯入的資料表裡面的內容都沒辦法編輯或刪除，於是再試看看只匯出匯入資料表裡面的資料，結果一直搞不定 id 這個欄位，總是會出現錯誤

```sql
#1366 - Incorrect integer value: 'id' for column 'id' at row 1
```

只好自己一筆一筆加進去了

#### 解決

1. 仔細看了看錯誤訊息，似乎是有一欄想插入 ``'id'`` 這個值到 id 欄位，突然想到用編輯器把匯出檔打開看看，沒想到 CSV 格式意外的簡單，完全只是用 `""` 把每個欄位的值包起來，然後用 `,` 把每一欄隔開而已，然後第一行是欄位的名稱，難怪會插入 `'id'` 進去，把第一行刪掉就可以順利匯入了。
2. 又試了一次匯入整個資料表結果沒有剛剛的問題了？？
3. 匯入後的資料無法編輯或刪除，好像是因為目前資料表裡面沒有主鍵，把 id 重新設為主鍵就解決了

## 參考資料

- [Day 7 - 如何和 Digitalocean 主機溝通？](https://ithelp.ithome.com.tw/articles/10187073)
- [How To Set Up Apache Virtual Hosts on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-18-04)
- [Initial Server Setup with Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/ubuntu-18-04-cmn)
- [You can't modify the Hosts file or the Lmhosts file in Windows 7](https://docs.microsoft.com/en-US/troubleshoot/windows-server/networking/cannot-modify-hosts-lmhosts-files)
- [How To Install and Secure phpMyAdmin on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-20-04)
- [How to Transfer Files to Droplets With FileZilla](https://docs.digitalocean.com/products/droplets/how-to/transfer-files/)
- [爲你的Server綁定網域(domain)](https://morrisctech.com/2018/08/21/bind_domain/)

###### tags: `Lidemy-MTR05`, `Week14`
