const express = require('express')
require('express-async-errors')
const app = express()
const middleware = require('./util/middleware')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
  })
}

app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

start()