import React from "react"

const Filter = (props) => {
  return (
    <div>
      find countries:
      <input onChange={props.handleFilterChange}/>
    </div>
  )
}

export default Filter