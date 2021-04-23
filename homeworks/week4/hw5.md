## 請以自己的話解釋 API 是什麼

API（Application Programming Interface），中文叫做**應用程式介面**，用來定義應用程式之間交換資料的資料格式或慣例等。

先看比較抽象的**介面**這兩個字，如果在維基百科上面搜尋介面相關資訊，會出現一個頁面，跟你說：下面這些都是介面，要你選一種進去看
ㄧ般大家最常接觸到的介面，應該是手機充電線的上的接口，像是 USB（Type-A，Type-C…）、Lightning，都是一種介面，
他們不只可以充電，也可以做資料傳輸使用，例如用 USB Type-C 的線連接你的手機跟電腦，就能讓你的手機跟你的電腦互相做溝通（備份通訊錄、檔案、私密照…）
還有大家的電腦，或是每天在滑的手機，螢幕上顯示的那些圖示、按鈕、視窗，叫做**使用者介面**（UI, User Interface），
更細分的話則叫做**圖形使用者介面**（GUI, Graphical User Interface），讓使用者可以跟電腦做溝通（？），不然其實電腦的世界全部都是 0 跟 1 組成，人類是看不懂的

而 API，就是讓應用程式之間互相傳送資訊時，應該要用什麼樣的方式，才能讓雙方都清楚明白彼此的需求跟回應。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

200、204、301、302、400、404、500、503
- 201 Created：請求成功，且新的資源也成功地被建立了
- 401 Unauthorized：這個請求需要有授權才會給予應有的回應
- 418 I'm a teapot：當一個控制茶壺的[HTCPCP](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E5%92%96%E5%95%A1%E5%A3%B6%E6%8E%A7%E5%88%B6%E5%8D%8F%E8%AE%AE)收到BREW或POST指令，請求煮咖啡時的回應（一個愚人節笑話。在某些網站（Google.com）或項目（Node.js、ASP.NET、Go語言）的彩蛋）

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

Base Url: `https://api.hojiaga.com`

#### Get Restaurants
Get all restaurants if no parameter is given.

`GET https://api.hojiaga.com/restaurants`

##### Optional Query Parameters
|Parameter  |Type  |Valid values                                                                            |
|-----------|------|----------------------------------------------------------------------------------------|
|`name`     |string|Search a restaurant by it's name. It can be the full name or partial name.              |
|`meals`    |string|Valid values: `breakfast`, `brunch`, `lunch`, `dinner`                                  |
|`cuisine`  |string|Valid values: `taiwanese`, `chinese`, `cantonese`, `japanese`, `korean`, `international`|
|`limit`    |number|Constrains the number of restaurants returned.                                          |

##### example:
###### request
`https://api.hojiaga.com/restaurants?name=abao`
###### response
```
[
  {
    "id": 156654,
    "name": "abao",
    "meals": "breakfast", "brunch",
    "cuisine": "international"
  },
  {
    "id": 156232,
    "name": "abao's kitchen",
    "meals": "lunch", "dinner",
    "cuisine": "taiwanese", "japanese"
  }
]
```

-----

#### Get a Restaurant

`GET https://api.hojiaga.com/restaurants/:id`

##### example:
###### request
`https://api.hojiaga.com/restaurants/156654`
###### response
```
{
  "id": 156654,
  "name": "abao",
  "meals": "breakfast", "brunch",
  "cuisine": "international"
}
```

-----

#### Add a Restaurant

`POST https://api.hojiaga.com/restaurants`

|Parameter  |Type  |Description                                                                             |
|-----------|------|----------------------------------------------------------------------------------------|
|`name`     |string|Restaurant's full name.                                                                 |
|`meals`    |string|Valid values: `breakfast`, `brunch`, `lunch`, `dinner`                                  |
|`Cuisine`  |string|Valid values: `taiwanese`, `chinese`, `Cantonese`, `japanese`, `korean`, `international`|

-----

#### Update a Restaurant

`PATCH https://api.hojiaga.com/restaurants/:id`

##### Optional Query Parameters(At least one parameter value required)
|Parameter  |Type  |Valid values                                                                            |
|-----------|------|----------------------------------------------------------------------------------------|
|`name`     |string|Search a restaurant by it's name. It can be the full name or partial name.              |
|`meals`    |string|Valid values: `breakfast`, `brunch`, `lunch`, `dinner`                                  |
|`Cuisine`  |string|Valid values: `taiwanese`, `chinese`, `Cantonese`, `japanese`, `korean`, `international`|
|`limit`    |number|Constrains the number of restaurants returned.                                          |

-----

#### Delete a Restaurant

`DELETE https://api.hojiaga.com/restaurants/:id`
