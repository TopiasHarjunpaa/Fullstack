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

test('new blog can be added with correct title and likes', async () => {
  const newBlog = {
    title: 'For testing',
    author: 'Tester',
    url: 'test.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(b => b.title)
  const likes = blogsAtEnd.filter(b => b.title === newBlog.title).map(b => b.likes)
  expect(blogsAtEnd).toHaveLength(helper.Initialblogs.length + 1)
  expect(titles).toContainEqual('For testing')
  expect(likes).toContain(newBlog.likes)

})

test('blog without likes input gets value of 0', async () => {
  const newBlog = {
    title: 'Without likes',
    author: 'No likes',
    url: 'likes.net'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const likes = blogsAtEnd.filter(b => b.title === newBlog.title).map(b => b.likes)
  expect(blogsAtEnd).toHaveLength(helper.Initialblogs.length + 1)
  expect(likes).toContain(0)
})

test('adding blog without title does not success', async () => {
  const newBlog = {
    author: 'No title',
    url: 'notitle.net',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.Initialblogs.length)
})

test('adding blog without url does not success', async () => {
  const newBlog = {
    title: 'No url',
    author: 'nourl'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.Initialblogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})