const Success = ({ message }) => {
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid'
  }

  if (message === null) {
    return null
  }
  return (
    <div style={successStyle}>
      {message}
    </div>
  )
}

export default Success