const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000
const secret = process.env.secret || 'keyboard cat'
const ARTICLES_NUM_LIMIT = 5

const articleController = require('./controllers/article')
const categoryController = require('./controllers/category')
const adminController = require('./controllers/admin')

app.set('view engine', 'ejs')

app.use(session({
  secret,
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())

app.use((req, res, next) => {
  res.locals.adminId = req.session.adminId
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

function paginator(isIncludeDeleted) {
  return async(req, res, next) => {
    const articleCount = await articleController.countArticles(Number(req.params.id), isIncludeDeleted)
    const pageCount = Math.ceil(articleCount / ARTICLES_NUM_LIMIT) || 1 // 如果 articleCount 是 0，把 pageCount 設為 1
    const page = Number(req.query.page) || 1 // 如果 Number(req.query.page) 為 NaN 或 0，把 page 設為 1
    const validPage = (page > pageCount) || (page < 1) ? 1 : page // 如果 page 大於 pageCount 或 page 小於 1，把 validPage 設為 1，
    res.pagination = {
      currentPage: validPage,
      previousPage: null,
      nextPage: null,
      pageCount,
      offset: (validPage - 1) * ARTICLES_NUM_LIMIT,
      limit: ARTICLES_NUM_LIMIT,
      articleCount
    }
    if (validPage < pageCount) res.pagination.nextPage = validPage + 1
    if (validPage > 1) res.pagination.previousPage = validPage - 1
    next()
  }
}

function checkAuthority(req, res, next) {
  const { adminId } = req.session

  if (!adminId) {
    req.flash('errorMessage', '你沒有權限喔不要想壞壞')
    return res.redirect('/login')
  }

  adminController.checkAdmin(adminId, (err, isAdmin) => {
    // 這邊不知道怎麼縮排比較好，只能照 eslint 給的規則排，覺得三元運算子很好用但是多於一個判斷似乎就會開始影響閱讀
    const errorMessage = err
      ? err.toString()
      : !isAdmin
          ? '你沒有權限喔不要想壞壞'
          : ''

    if (errorMessage) {
      req.flash('errorMessage', errorMessage)
      return res.redirect('/login')
    }

    next()
  })
}

function redirectBack(req, res) {
  return res.redirect('back')
}

// 首頁 & 關於我
app.get('/', paginator(), articleController.renderArticles)
app.get('/about', (req, res) => {
  res.render('about')
})

// 文章
app.get('/list', paginator(), articleController.renderArticles)
app.get('/post/:id', articleController.renderSingleArticle, redirectBack)
app.get('/editor', checkAuthority, articleController.renderEditor)
app.post('/editor', checkAuthority, articleController.handleEditor, redirectBack)
app.get('/editor/:id', checkAuthority, articleController.renderEditor)
app.get('/delete/:id', checkAuthority, articleController.handleDelete, redirectBack)
app.get('/undelete/:id', checkAuthority, articleController.handleUndelete, redirectBack)

// 分類
app.get('/categories', categoryController.renderAllCategories)
app.get('/categories/:id', paginator(), articleController.renderArticles)

// 管理員
app.get('/dashboard', checkAuthority, paginator(true), articleController.renderArticles)
app.get('/login', adminController.renderLogin)
app.post('/login', adminController.handleLogin, redirectBack)
app.get('/logout', adminController.handleLogout, redirectBack)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
