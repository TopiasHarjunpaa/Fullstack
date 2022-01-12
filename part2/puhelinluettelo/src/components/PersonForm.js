import React from "react";

const Input = ({ name, value, onChange }) => {
  return (
    <div>
      {name}
      <input value={value} onChange={onChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}>
        <Input name='nimi:' value={props.newName} onChange={props.handleNameChange}/>
        <Input name='numero:' value={props.newNumber} onChange={props.handleNumberChange}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm