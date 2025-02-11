const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User, UserSession } = require('../models')

router.post('/', async (request, response) => {
  const body = request.body
  console.log(body)

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'salainen'

  console.log(user, passwordCorrect)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled) {
    return response.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  console.log(user)

  await UserSession.create({ userId: user.id })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id })
})

module.exports = router