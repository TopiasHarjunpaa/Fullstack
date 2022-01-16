import React from "react"

const CountryInfo = ({ country, weather }) => {
  console.log(weather)
  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <Languages languages={Object.values(country.languages)}/>
      <img src={country.flags.png} alt='flag' width='160' height='100'/>
      <h3>Weather in {country.capital}</h3>
      <p>
        <b>Temperature:</b> 
        {weather.current.temperature} Celcius
      </p>
      <img src={weather.current.weather_icons} alt='flag' width='50' height='50'/>
      <p>
        <b>Wind:</b>
        {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
  )
}

const Languages = ({ languages }) => {
  console.log()
  return (
    <div>
        <ul>
        {languages.map(language =>
          <Language key={language} language={language}/>
        )}
      </ul>
    </div>
  )
}

const Language = ({ language }) => {
  return (
    <div>
      <li>{language}</li>
    </div>
  )
}

export default CountryInfo