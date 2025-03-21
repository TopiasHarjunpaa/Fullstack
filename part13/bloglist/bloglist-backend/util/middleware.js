const logger = require('./logger')
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { User, UserSession } = require('../models')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
    const session = await UserSession.findOne({
      where: { userId: req.decodedToken.id }
    })
    if (!session) {
      return res.status(401).json({ error: 'No active session' })
    }

    const user = await User.findByPk(req.decodedToken.id)
    console.log(user)

    if (user.disabled) {
      return res.status(401).json({ error: 'Account disabled' })
    }

  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  } else if (error.name === 'SequelizeValidationError') {
    return response.status (400).json({ error: error.message })
  }
  logger.error(error.message)

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}