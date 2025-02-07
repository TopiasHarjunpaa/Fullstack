const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { User, Blog } = require('../models')
const middleware = require('../util/middleware')
const { Op } = require('sequelize')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    order: [['likes', 'DESC']],
  })
  res.json(authors)
})

module.exports = router