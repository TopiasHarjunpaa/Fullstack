const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
    const notes = await Blog.findAll()
    res.json(notes)
  })
  
router.post('/', async (req, res) => {
  try {
    const note = await Blog.create(req.body)
    return res.json(note)
  } catch(error) {
    return res.status(400).json({ error })
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