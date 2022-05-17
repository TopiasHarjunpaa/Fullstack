const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
let token = ''
let userId = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.Initialblogs)
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('testpw', 10)
  const user = new User({ username: 'testuser', passwordHash })
  await user.save()
  const result = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'testpw' })
  token = 'bearer ' + result.body.token.toString()
  userId = result.body.token.id
})

describe('when there is initially blogs saved', () => {
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
})

describe('addition of new blog', () => {
  test('new blog can be added with correct title and likes', async () => {
    const newBlog = {
      title: 'For testing',
      author: 'Tester',
      url: 'test.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
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

  test('new blog can not be added without token and returns correct statuscode', async () => {
    const newBlog = {
      title: 'For testing',
      author: 'Tester',
      url: 'test.com',
      likes: 5
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('invalid token')

  })
  test('blog without likes input gets value of 0', async () => {
    const newBlog = {
      title: 'Without likes',
      author: 'No likes',
      url: 'likes.net'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
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
      .set('Authorization', token)
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
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.Initialblogs.length)
  })
})

describe('deleting a blog', () => {
  test('blog can be deleted', async () => {
    const newBlog = {
      title: 'For testing',
      author: 'Tester',
      url: 'test.com',
      likes: 5,
      user: userId
    }

    const result = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)

    const blogToDelete = result.body

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const ids = blogsAtEnd.map(b => b.id)
    expect(blogsAtEnd).toHaveLength(helper.Initialblogs.length)
    expect(ids).not.toContain(blogToDelete.id)
  })
})

describe('modifying a blog', () => {
  test('number of likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogParams = blogsAtStart[0]
    const updatedLikes = 999
    const updatedBlog = {
      title: blogParams.title,
      author: blogParams.author,
      url: blogParams.url,
      likes: updatedLikes
    }

    await api
      .put(`/api/blogs/${blogParams.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.filter(b => b.id === blogParams.id).map(b => b.likes)
    expect(blogsAtEnd).toHaveLength(helper.Initialblogs.length)
    expect(likes).toContain(updatedLikes)
  })
})

describe('when there is initially one user at db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'tha',
      password: 'topias',
      name: 'topias',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testuser',
      name: 'toto',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is empty', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'toto',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username or password can not be empty')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is empty', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'secondtestuser',
      name: 'toto',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username or password can not be empty')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 't',
      name: 'toto',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be at least 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'thirdtestuser',
      name: 'toto',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
})