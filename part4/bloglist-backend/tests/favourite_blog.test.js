const listHelper = require('../utils/list_helper')
const blogs = require('./bloglist').blogs

describe('favourite blog', () => {
  test('returns no result when list is empty', () => {
    const emptyBlogs = []

    const result = listHelper.favouriteBlog(emptyBlogs)
    expect(result).toBe(null)
  })

  test('when list has only one blog returns its value', () => {
    const listWithOneBlog = [blogs[0]]
    const result = listHelper.favouriteBlog(listWithOneBlog)
    const expected = {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7
    }
    expect(result).toEqual(expected)
  })

  test('in a bigger list is found correctly', () => {
    const result = listHelper.favouriteBlog(blogs)
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
    expect(result).toEqual(expected)
  })
})
