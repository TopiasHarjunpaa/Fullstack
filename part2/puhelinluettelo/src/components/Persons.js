import React from "react"

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      <p>
        {person.name}: 
        {person.number}
        <button onClick={() => deletePerson(person.id)}>delete</button>
      </p>
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

const Persons = ({ persons, filter, deletePerson }) => {
  return (
    <div>
      {FilterPersons(persons, filter).map(person =>
        <Person 
          key={person.id}
          person={person}
          deletePerson={deletePerson}
        />
      )}
    </div>
  )
}

export default Persons