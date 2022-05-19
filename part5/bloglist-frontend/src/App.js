import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])    

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)    
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username, password})
      
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername(username)
      setPassword(password)
      notify('Logging succeed')
    } catch (exception) {
      notify('Wrong username or password', 'alert')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setUsername('')
    setPassword('')    
  }

  const createNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      console.log(newBlog)
      console.log(blogs.length)
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      notify('Creation of blog failed', 'alert')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification}/>

        <form onSubmit={handleLogin}>
          <div>
            username
              <input type="text" 
              value={username} 
              name="Username" 
              onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password
              <input type="text" 
              value={password} 
              name="Password" 
              onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type="submit">login</button>
      </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Bloglist</h2>
      <Notification notification={notification}/>
      
      <form onSubmit={handleLogout}>
        {user.name} logged in
        <button type="submit">logout</button>
      </form>
      <br/>

      <h2>Create new blog</h2>

      <form onSubmit={createNewBlog}>
        <div>
          title:
            <input type="text" 
            value={title} 
            name="title" 
            onChange={({ target }) => setTitle(target.value)}
            />  
        </div>     
        <div>
          author:
            <input type="text" 
            value={author} 
            name="author" 
            onChange={({ target }) => setAuthor(target.value)}
            />  
        </div> 
        <div>
          url:
            <input type="text" 
            value={url} 
            name="url" 
            onChange={({ target }) => setUrl(target.value)}
            />  
        </div>  
        <button type="submit">create</button>
      </form>
      <br/>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
