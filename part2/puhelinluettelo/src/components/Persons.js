import React from "react"

const Person = ({ name, number }) => {
  return (
    <div>
      <p>{name}: {number}</p>
    </div>
  )
}

const FilterPersons = ( persons, filter) => {
  return (
    persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
  )
}

const Persons = ({ persons, filter }) => {
  return (
    <div>
      {FilterPersons(persons, filter).map(person =>
        <Person 
          key={person.id}
          name={person.name}
          number={person.number}
        />
      )}
    </div>
  )
}

export default Persons