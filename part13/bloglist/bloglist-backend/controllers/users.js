const router = require('express').Router()

const { User, Blog } = require('../models')
const { Op, where } = require('sequelize')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
        model: Blog,
        attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.status(201).json(user)
})

router.get('/:id', async (req, res) => {
  const where = { id: req.params.id }

  if (req.query.readed) {
    where['$readings.readinglists.readed$'] = req.query.readed === 'true'
  }

  const user = await User.findOne({
    include: {
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      through: {
        attributes: ['id', 'readed']
      }
    },
    where
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } })
    if (user) {
      user.name = req.body.name
      await user.save()
      res.json(user)
    } else {
      res.status(404).end()
    }
  } catch(error) {
    return res.status(400).json({ error })
  }
})

module.exports = router