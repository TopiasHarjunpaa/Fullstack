const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')


const config = require('./utils/config')
const logger = require('./utils/logger')

const mongoose = require('mongoose')
const url = config.MONGODB_URI

mongoose.connect(url).then(() => {
  logger.info('connected to MongoDB')
})
  .catch((error => {
    logger.error('error connecting to MongoDB', error.message)
  }))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

const PORT = config.PORT | 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})