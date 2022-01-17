const Error = ({ message }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid'
  }

  if (message === null) {
    return null
  }
  return (
    <div style={errorStyle}>
      {message}
    </div>
  )  
}

export default Error