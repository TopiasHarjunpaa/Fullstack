import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Success from './components/Success'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personNames = persons.map(person => person.name)
    
    if (personNames.includes(newName) && newNumber !== "") {
      const message = `${newName} is already added to phonebook, replace the old number with new one?`
      if (window.confirm(message)) {
        const person = persons.find(person => person.name === newName)
        const updatedPerson = {...person, number: newNumber}
        personService
          .updateNumber(person.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))
            setSuccessMessage(
              `Old number replaced for ${newName}`
            )
          })
          .catch(error => {
            setErrorMessage(
              `${newName} has already removed from the server`
            )
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSuccessMessage(`Added ${newName}`)
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage(error.response.data.error)          
        })
    }
    setTimeout(() => {
      setSuccessMessage(null)
      setErrorMessage(null)
    }, 2000)

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const name = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${name} ?`)) {
      personService.del(id)
      setPersons(persons.filter(person => person.id !== id))

      setSuccessMessage(
        `${name} deleted`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 2000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Success message={successMessage}/>
      <Error message={errorMessage}/>
      <Filter handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm 
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        filter={filter}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
