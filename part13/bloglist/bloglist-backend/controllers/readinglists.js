const router = require('express').Router()

const { Readinglist } = require('../models')

router.post('/', async (req, res) => {
  const readinglist = await Readinglist.create(req.body)
  res.status(201).json(readinglist)
})

router.put('/:id', async (req, res) => {
    const readinglist = await Readinglist.findByPk(req.params.id)
    if (readinglist) {
        readinglist.readed = req.body.readed
        await readinglist.save()
        res.json(readinglist)
    } else {
        res.status(404).end()
    }
})

module.exports = router