const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { UserSession } = require('../models')

router.delete('/', async (req, res) => {
  const session = UserSession.findOne({
    where: { userId: req.decodedToken.id }
  })
  if (session) {
    await session.destroy()
    return res.status(204).end()
  } else {
    return res.status(401).json({ error: 'No active session' })
  }
})

module.exports = router