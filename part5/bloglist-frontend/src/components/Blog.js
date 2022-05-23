const Blog = ({ blog, info, setInfo, update }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (info === blog.id) {
    return (
      <div style={blogStyle}>
        <h3>
          {blog.title} 
          <button onClick={() => setInfo(null)}>hide</button>
        </h3> 
        <p>created by: {blog.author}</p>
        <p>url: {blog.url}</p>
        <p>
          likes: {blog.likes}
          <button onClick={() => update(blog)}>like</button></p>
      </div>        
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setInfo(blog.id)}>view</button>
      </div>  
    )
  }  
}


export default Blog