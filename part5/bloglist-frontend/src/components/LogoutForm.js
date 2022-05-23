const LogoutForm = ({ handleSubmit, username }) => {
  return (
    <div>
      <h2>Bloglist</h2>

      <form onSubmit={handleSubmit}>
        {username} logged in
        <button type="submit">logout</button>
      </form>
      <br/>
    </div>
  )
}

export default LogoutForm