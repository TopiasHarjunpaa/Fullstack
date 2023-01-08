const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const reducer = (sum, item) => {
    return sum + item
  }
  return likes.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  let favourite = null
  let likes = -1
  blogs.forEach(blog => {
    if (blog.likes > likes) {
      likes = blog.likes
      favourite = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
  })
  return favourite
}

const mostBlogs = (blogs) => {
  let dict = {}
  let most = null
  let blogCount = 0
  blogs.forEach(blog => {
    if (dict[blog.author] === undefined) {
      dict[blog.author] = 1
    } else {
      dict[blog.author] += 1
    }
    if (dict[blog.author] > blogCount) {
      blogCount = dict[blog.author]
      most = {
        author: blog.author,
        blogs: dict[blog.author]
      }
    }
  })
  return most
}

const mostLikes = (blogs) => {
  let dict = {}
  let most = null
  let likeCount = 0
  blogs.forEach(blog => {
    if (dict[blog.author] === undefined) {
      dict[blog.author] = blog.likes
    } else {
      dict[blog.author] += blog.likes
    }
    if (dict[blog.author] > likeCount) {
      likeCount = dict[blog.author]
      most = {
        author: blog.author,
        likes: dict[blog.author]
      }
    }
  })
  return most
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}