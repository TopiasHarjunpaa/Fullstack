import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggable'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [blogInfo, setBlogInfo] = useState(null)

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

  const createNewBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      notify('Creation of blog failed', 'alert')
    }
  }

  const updateLikes = async (event, blog) => {
    event.preventDefault()
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      const updatedLikes = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(b => b.id !== blog.id ? b : updatedLikes))
      notify(`a new like added for a blog: ${updatedBlog.title}`)
    } catch (exception) {
      notify('Updating likes failed', 'alert')
    }
  }

  const sortByLikes = (blogs) => {
    blogs.sort(function (a, b) {
      return b.likes - a.likes
    })
  }

  sortByLikes(blogs)

  const deleteBlog = async (event, blog) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.del(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        notify(`Blog ${blog.title} by ${blog.author} removed`)
      } catch (exception) {
        notify('Deleting a blog failed', 'alert')
      }
    }

    
  }

  const blogFormRef = useRef()

  return (
    <div>
      <Notification notification={notification}/>
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}          
        /> :
        <div>
          <LogoutForm
            username={user.name}
            handleSubmit={handleLogout}
          />
    
          <Togglable buttonLabel="add new blog" ref={blogFormRef}>        
            <BlogForm createBlog={createNewBlog}/>
          </Togglable>
          <br/>
    
          {blogs.map(blog =>
            <Blog 
              key={blog.id} 
              blog={blog} 
              info={blogInfo} 
              setInfo={setBlogInfo}
              update={updateLikes}
              del={deleteBlog}
              userId={user.id}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App
