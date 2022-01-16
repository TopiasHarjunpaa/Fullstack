import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ListCountries from './components/ListCountries'
import CountryInfo from './components/CountryInfo'

const App = () => { 
  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')
  const [country, setCountry] = useState({ capital: 'Helsinki' })
  const [infoStatus, setInfoStatus] = useState(false)
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    const city = country.capital
    console.log(city)
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
      .then(response => {
        setWeather(response.data)
      })
  },[country])

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
        <CountryInfo country={country} weather={weather}/>
      </div>
    )
  } else {
    return (
      <div>
        <Filter handleFilterChange={handleFilterChange}/>
        <ListCountries countries={countries} filter={filter} info={changeCountry} weather={weather}/>
      </div>
    )
  }
}

export default App