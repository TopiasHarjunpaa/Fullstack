const listHelper = require('../utils/list_helper')
const blogs = require('./bloglist').blogs

describe('most likes', () => {
  test('returns no result when list is empty', () => {
    const emptyBlogs = []

    const result = listHelper.mostLikes(emptyBlogs)
    expect(result).toBe(null)
  })

  test('returns its author and number of likes when list has only one blog', () => {
    const listWithOneBlog = [blogs[0]]
    const result = listHelper.mostLikes(listWithOneBlog)
    const expected = {
      author: 'Michael Chan',
      likes: 7
    }
    expect(result).toEqual(expected)
  })

  test('founds author with most total likes in a bigger list', () => {
    const result = listHelper.mostLikes(blogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toEqual(expected)
  })
})
