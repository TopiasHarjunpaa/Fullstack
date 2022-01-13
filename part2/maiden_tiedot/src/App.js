import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ListCountries from './components/ListCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  console.log(countries.length)

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange}/>
      <ListCountries countries={countries} filter={filter}/>
    </div>
  )
}

export default App