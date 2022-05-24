const Blog = ({ blog, info, setInfo, update, del, userId }) => {
  return (
    <div className='blogStyle'>
      <p>{blog.user.id} eka</p>
      <p>{userId} toka</p>
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
            <button onClick={(event) => update(event, blog)}>like</button>
          </p>
          {blog.user.id === userId &&
            <button 
              className='removeButton'
              onClick={(event) => del(event, blog)}>delete
            </button>
          }
        </div> : 
        <div>
          {blog.title} {blog.author}&nbsp;
          <button onClick={() => setInfo(blog.id)}>view</button>
        </div>  
      }
    </div>
  )
}


export default Blog