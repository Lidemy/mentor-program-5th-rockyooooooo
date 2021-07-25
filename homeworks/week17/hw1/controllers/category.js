const db = require('../models')

const { Category } = db

const categoryController = {
  renderAllCategories: async(req, res) => {
    let categories = null
    try {
      categories = await Category.findAll()
    } catch (error) {
      if (error) return console.log(error)
    }

    res.render('categories', {
      categories
    })
  }
}

module.exports = categoryController
