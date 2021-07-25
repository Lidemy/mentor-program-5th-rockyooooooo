const bcrypt = require('bcrypt')
const db = require('../models')

const { Admin } = db

const adminController = {
  renderLogin: async(req, res) => {
    res.render('login')
  },
  handleLogin: async(req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '認真？沒輸入帳號密碼也想登入？')
      return next()
    }

    let admin = null
    try {
      admin = await Admin.findOne({
        where: {
          username
        }
      })
    } catch (error) {
      req.flash('errorMessage', error.toString())
      return next()
    }

    if (!admin) {
      req.flash('errorMessage', '帳號或密碼錯誤')
      return next()
    }

    bcrypt.compare(password, admin.password, (err, result) => {
      if (err || !result) {
        req.flash('errorMessage', '帳號或密碼錯誤')
        return next()
      }

      req.session.adminId = admin.id
      res.redirect('/')
    })
  },
  handleLogout: (req, res, next) => {
    req.session.adminId = null
    next()
  },
  checkAdmin: async(id, cb) => {
    let admin = null
    try {
      admin = await Admin.findOne({
        where: {
          id
        }
      })
    } catch (error) {
      return cb(error, null)
    }

    return cb(null, !!admin)
  }
}

module.exports = adminController
