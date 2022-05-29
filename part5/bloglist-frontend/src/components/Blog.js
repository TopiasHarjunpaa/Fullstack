const Blog = ({ blog, info, setInfo, update, del, userId }) => {
  return (
    <div className='blogStyle'>
      {info === blog.id ?
        <div>
          <h3>
            {blog.title}&nbsp;
            <button onClick={() => setInfo(null)}>hide</button>
          </h3> 
          <p>created by: {blog.author}</p>
          <p>url: {blog.url}</p>
          <p>
            likes: {blog.likes}
            <button id="like-button" onClick={(event) => update(event, blog)}>like</button>
          </p>
          {blog.user.id === userId &&
            <button 
              id="delete-button"
              className='removeButton'
              onClick={(event) => del(event, blog)}>delete
            </button>
          }
        </div> : 
        <div>
          <nobr>{blog.title}&nbsp;</nobr>
          <nobr>{blog.author}&nbsp;</nobr>
          <button id={blog.id} onClick={() => setInfo(blog.id)}>view</button>
        </div>  
      }
    </div>
  )
}


export default Blog