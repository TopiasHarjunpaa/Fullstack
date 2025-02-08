import { useState } from "react"
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [year, setYear] = useState(null)

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleYearChange = (event) => {
    setYear(event.target.value)
  }

  const createNewBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      year: year
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    setYear(null)  
  }
  
  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={createNewBlog}>
        <div>
          title:
            <input
              value={title} 
              onChange={handleTitleChange}
              id="title"
            />  
        </div>     
        <div>
          author:
          <input
              value={author} 
              onChange={handleAuthorChange}
              id="author"
            />  
        </div> 
        <div>
          url:
          <input
              value={url} 
              onChange={handleUrlChange}
              id="url"
            />  
        </div>
        <div>
          year:
          <input
              value={year} 
              onChange={handleYearChange}
              id="year"
            />  
        </div>
        <button type="submit" id="create-blog-button" >create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm