const { Op } = require('sequelize')
const db = require('../models')

const { Article, Category } = db

const articleController = {
  renderArticles: async(req, res) => {
    const { path } = req.route
    const { currentPage, pageCount, offset, limit, previousPage, nextPage, articleCount } = res.pagination

    let view = path.replace('/', '') || 'index'
    const config = {}
    // 用 switch 來根據路由決定 config 內容，但太多層了感覺有點難閱讀，所以用點的方式設定
    switch (path) {
      case '/list':
        config.where = {
          is_deleted: 0
        }
        break
      case '/categories/:id':
        config.where = {
          CategoryId: Number(req.params.id),
          is_deleted: 0
        }
        config.include = Category
        view = 'index'
        break
      case '/dashboard':
        break
      default:
        config.where = {
          is_deleted: 0
        }
        config.include = Category
    }
    // 常駐條件寫在 switch 外面
    config.order = [
      ['id', 'DESC']
    ]
    config.limit = limit
    config.offset = offset

    let articles = null
    try {
      articles = await Article.findAll(config)
    } catch (error) {
      return console.log(error)
    }

    res.render(view, {
      articles,
      articleCount,
      path,
      pageCount,
      currentPage,
      previousPage,
      nextPage
    })
  },
  renderSingleArticle: async(req, res, next) => {
    const { id } = req.params
    const { adminId } = req.session
    let config = {
      where: {
        id: Number(id),
        is_deleted: 0
      },
      include: Category
    }

    if (adminId) {
      config = {
        where: {
          id: Number(id),
          [Op.or]: [
            { AdminId: Number(adminId) },
            { is_deleted: 0 }
          ]
        },
        include: Category
      }
    }

    let article = null
    try {
      article = await Article.findOne(config)
    } catch (error) {
      return console.log(error)
    }

    if (!article) return next()

    res.render('post', {
      article,
      categoryName: article.Category.name
    })
  },
  renderCategoryArticles: async(req, res) => {
    const { currentPage, pageCount, offset, limit, previousPage, nextPage, articleCount } = res.pagination
    const config = {
      where: {
        CategoryId: Number(req.params.id),
        is_deleted: 0
      },
      include: Category,
      limit,
      offset
    }

    let articles = null
    try {
      articles = await Article.findAll(config)
    } catch (error) {
      return console.log(error)
    }

    res.render('index', {
      articles,
      articleCount,
      url: req.route.path,
      pageCount,
      currentPage,
      previousPage,
      nextPage
    })
  },
  renderEditor: async(req, res) => {
    const { id } = req.params

    let article = null
    if (id) {
      try {
        article = await Article.findOne({
          where: {
            id
          },
          include: Category
        })
      } catch (error) {
        return console.log(error)
      }
    }

    let categories = null
    try {
      categories = await Category.findAll()
    } catch (error) {
      return console.log(error)
    }

    res.render('editor', {
      article,
      categories
    })
  },
  handleEditor: async(req, res, next) => {
    const { title, categoryId, content, isNewArticle, id } = req.body
    const { adminId } = req.session

    if (!title || !categoryId || !content) {
      req.flash('errorMessage', '所有欄位都要填哦！')
      return next()
    }

    let article = null
    if (isNewArticle === 'true') {
      try {
        article = await Article.create({
          title,
          content,
          AdminId: adminId,
          CategoryId: categoryId
        })
      } catch (error) {
        return console.log(error)
      }
    } else {
      try {
        await Article.update({
          title,
          content,
          CategoryId: categoryId
        }, {
          where: {
            id: Number(id)
          }
        })
      } catch (error) {
        return console.log(error)
      }
    }
    res.redirect(`/post/${Number(id) || article.id}`)
  },
  handleDelete: async(req, res, next) => {
    try {
      await Article.update({
        is_deleted: 1
      }, {
        where: {
          id: Number(req.params.id)
        }
      })
    } catch (error) {
      return console.log(error)
    }

    next()
  },
  handleUndelete: async(req, res, next) => {
    try {
      await Article.update({
        is_deleted: 0
      }, {
        where: {
          id: Number(req.params.id)
        }
      })
    } catch (error) {
      return console.log(error)
    }

    next()
  },
  countArticles: async(categoryId, isIncludeDeleted) => {
    const config = {
      where: {}
    }
    if (categoryId) config.where.categoryId = categoryId
    if (!isIncludeDeleted) config.where.is_deleted = 0

    let articleCount = 0
    try {
      articleCount = await Article.count(config)
    } catch (error) {
      console.log('An error occurred in countArticle', error)
    }

    return articleCount
  }
}

module.exports = articleController
