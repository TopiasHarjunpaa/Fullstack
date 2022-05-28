import { useState } from "react"
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const createNewBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')    
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
              placeholder='title'
            />  
        </div>     
        <div>
          author:
          <input
              value={author} 
              onChange={handleAuthorChange}
              placeholder='author'
            />  
        </div> 
        <div>
          url:
          <input
              value={url} 
              onChange={handleUrlChange}
              placeholder='url'
            />  
        </div>  
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm