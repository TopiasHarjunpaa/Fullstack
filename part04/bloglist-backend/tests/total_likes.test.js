const listHelper = require('../utils/list_helper')
const blogs = require('./bloglist').blogs

describe('total likes', () => {
  test('of empty list is zero', () => {
    const emptyBlogs = []

    const result = listHelper.totalLikes(emptyBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const listWithOneBlog = [blogs[0]]
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})
