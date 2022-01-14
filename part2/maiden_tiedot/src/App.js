import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ListCountries from './components/ListCountries'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')
  const [country, setCountry] = useState([])
  const [infoStatus, setInfoStatus] = useState(false)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const changeCountry = (event) => {
    setCountry(event)
    setInfoStatus(true)
  }
  if (infoStatus) {
    return (
      <div>
        <button onClick={() => setInfoStatus(false)}>back</button>
        <CountryInfo country={country}/>
      </div>
    )
  } else {
    return (
      <div>
        <Filter handleFilterChange={handleFilterChange}/>
        <ListCountries countries={countries} filter={filter} info={changeCountry}/>
      </div>
    )
  }
}

export default App