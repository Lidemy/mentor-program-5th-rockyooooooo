const db = require('../models')

const { Prize } = db

const prizeController = {
  getAllPrizes: async(req, res) => {
    let prizes = null
    try {
      prizes = await Prize.findAll()
    } catch (error) {
      return res.send({ error })
    }
    res.send({ prizes })
  },
  addPrize: async(req, res) => {
    const { name, description, imgUrl, weight } = req.body

    let prize = null
    try {
      prize = await Prize.create({
        name,
        description,
        imgUrl,
        weight: Number(weight)
      })
    } catch (error) {
      return res.send({ error })
    }
    res.send({ prize })
  },
  updatePrize: async(req, res) => {
    const { id, name, description, imgUrl, weight } = req.body
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
      return res.send({ error })
    }
    const message = '更新成功！'
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
      return res.send({ error })
    }
    const message = '刪除成功！'
    res.send({ message })
  },
  getAllPrizesForLottery: async(req, res, next) => {
    let prizes = null
    try {
      prizes = await Prize.findAll()
    } catch (error) {
      return res.send({ error })
    }

    res.prizes = JSON.stringify(prizes)
    next()
  }
}

module.exports = prizeController
