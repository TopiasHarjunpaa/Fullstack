import React from "react"

const CountryName = ({ country }) => {
  return (
    <div>
      {country.name.common}
    </div>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <Languages languages={Object.values(country.languages)}/>
      <img src={country.flags.png} alt='flag' width='160' height='100'/>
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

const FilterCountries = ( countries, filter) => {
  return (
    countries.filter(country => 
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    )
  )
}

const ListCountries = (props) => {
  const countries = FilterCountries(props.countries, props.filter)
  
  if (countries.length >= 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => 
          <CountryName key={country.name.common} country={country} />
        )}
      </div>
    )
  } else {
    return (
      <div>
          {countries.map(country => 
            <CountryInfo key={country.name.common} country={country} />
          )}      
      </div>
    )
  }
}

export default ListCountries