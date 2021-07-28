const db = require('../models')

const { Prize } = db
let message = ''

const prizeController = {
  getAllPrizes: async(req, res) => {
    let prizes = null
    try {
      prizes = await Prize.findAll()
    } catch (error) {
      message = error.toString()
      return res.send({ message })
    }
    res.send({ prizes })
  },
  addPrize: async(req, res) => {
    const { name, description, imgUrl, weight } = req.body
    if (isNaN(weight)) {
      message = '機率必須是數字'
      return res.send({ message })
    }

    let prize = null
    try {
      prize = await Prize.create({
        name,
        description,
        imgUrl,
        weight: Number(weight)
      })
    } catch (error) {
      message = error.toString()
      return res.send({ message })
    }
    res.send({ prize })
  },
  updatePrize: async(req, res) => {
    const { id, name, description, imgUrl, weight } = req.body
    if (isNaN(weight)) {
      message = '機率必須是數字'
      return res.send({ message })
    }

    try {
      await Prize.update({
        name,
        description,
        imgUrl,
        weight: Number(weight)
      }, {
        where: {
          id: Number(id)
        }
      })
    } catch (error) {
      message = error.toString()
      return res.send({ message })
    }
    message = '更新成功！'
    res.send({ message })
  },
  deletePrize: async(req, res) => {
    const { id } = req.params
    try {
      await Prize.destroy({
        where: {
          id: Number(id)
        }
      })
    } catch (error) {
      message = error.toString()
      return res.send({ message })
    }
    message = '刪除成功！'
    res.send({ message })
  },
  getAllPrizesForLottery: async(req, res, next) => {
    let prizes = null
    try {
      prizes = await Prize.findAll()
    } catch (error) {
      message = error.toString()
      return res.send({ message })
    }

    res.prizes = JSON.stringify(prizes)
    next()
  }
}

module.exports = prizeController
