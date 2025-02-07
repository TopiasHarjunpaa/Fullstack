const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { User, Blog } = require('../models')
const middleware = require('../util/middleware')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
  const where = {}
  
  if (req.query.search) {
    where[Op.or] = {
      title: {
        [Op.substring]: req.query.search
      },
      author: {
        [Op.substring]: req.query.search
      }
    }
  }
  
  const blogs = await Blog.findAll({
    order: [['likes', 'DESC']], 
    include: {
      model: User,
      attributes: ['username', 'name', 'id']
    },
    where
  })
  
  res.json(blogs)
})
  
router.post('/', middleware.tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({...req.body, userId: user.id})

  await blog.reload({
    include: {
      model: User,
      attributes: ['username', 'name', 'id']
    }
  })
  res.status(201).json(blog)
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    blog.likes = req.body.likes
    await blog.save()

    await blog.reload({
      include: {
        model: User,
        attributes: ['username', 'name', 'id']
      }
    })
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    await blog.destroy()
    return res.status(204).end()
  } else {
    return res.status(404).end()
  }
})

module.exports = router