const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const cors = require('cors')
const path = require('path')

const userController = require('./controllers/user')
const prizeController = require('./controllers/prize')

const app = express()
const port = process.env.PORT || 3000
const secret = process.env.secret || 'keyboard cat'

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret,
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
app.use(cors())

app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('errorMessage')
  res.locals.userId = req.session.userId
  next()
})

function isAdmin(req, res, next) {
  if (!req.session.userId) {
    const message = '請先登入'
    res.send({ message })
    return
  }
  next()
}

function getLottery(req, res) {
  const data = JSON.parse(res.prizes)
  const prizes = data.map((prize) => ({
    name: prize.name,
    description: prize.description,
    imgUrl: prize.imgUrl
  }))
  const weights = data.map((prize) => prize.weight)

  const lotteryPool = []
  for (let i = 0; i < prizes.length; i++) {
    for (let j = 0; j < weights[i]; j++) {
      lotteryPool.push(i)
    }
  }

  const randomNum = Math.floor(Math.random() * lotteryPool.length)

  res.send(prizes[lotteryPool[randomNum]])
}

// 首頁
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

// 抽
app.get('/draw', prizeController.getAllPrizesForLottery, getLottery)

// 獎項
app.get('/prizes', isAdmin, prizeController.getAllPrizes)
app.post('/prize', isAdmin, prizeController.addPrize)
app.post('/prize/:id', isAdmin, prizeController.updatePrize)
app.get('/prize/:id', isAdmin, prizeController.deletePrize)

// 管理員
app.post('/login', userController.handleLogin)
app.get('/logout', userController.handleLogout)

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
