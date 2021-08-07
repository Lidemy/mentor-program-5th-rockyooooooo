const bcrypt = require('bcrypt')
const db = require('../models')

const { User } = db

const userController = {
  renderLogin: (req, res) => {
    res.render('login')
  },
  handleLogin: async(req, res, next) => {
    const { username, password } = req.body
    let message = ''

    if (!username || !password) {
      message = '請輸入帳號密碼'
      return res.send({ message })
    }

    let user = null
    try {
      user = await User.findOne({
        where: {
          username
        }
      })
    } catch (error) {
      message = error.toString()
      return res.send({ message })
    }

    if (!user) {
      message = '帳號或密碼錯誤'
      return res.send({ message })
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) message = err.toString()
      if (!result) message = '帳號或密碼錯誤'
      if (err || !result) return res.send({ message })

      req.session.userId = user.id
      res.send({
        message,
        isLoggedIn: true
      })
    })
  },
  handleLogout: (req, res) => {
    req.session.userId = null
    const message = '登出成功'
    res.send({ message })
  }
}

module.exports = userController
