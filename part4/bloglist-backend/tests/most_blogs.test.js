const listHelper = require('../utils/list_helper')
const blogs = require('./bloglist').blogs

describe('most blogs', () => {
  test('returns no result when list is empty', () => {
    const emptyBlogs = []

    const result = listHelper.mostBlogs(emptyBlogs)
    expect(result).toBe(null)
  })

  test('returns its author and one blog when list has only one blog', () => {
    const listWithOneBlog = [blogs[0]]
    const result = listHelper.mostBlogs(listWithOneBlog)
    const expected = {
      author: "Michael Chan",
      blogs: 1
    }
    expect(result).toEqual(expected)
  })

  test('founds author with most blogs in a bigger list', () => {
    const result = listHelper.mostBlogs(blogs)
    const expected = {
      author: "Robert C. Martin",
      blogs: 3
    }
    expect(result).toEqual(expected)
  })
})
