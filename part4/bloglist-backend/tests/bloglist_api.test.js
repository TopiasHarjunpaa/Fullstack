const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.Initialblogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.Initialblogs.length)

})

test('blogs should have indentifying field named as id', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(r => r.id)
  expect(ids).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})