import React from "react"

const CountryName = ({ country, info }) => {
  return (
    <div>
        {country.name.common}
        <button onClick={() => info(country)}>show</button>
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
  } else if (countries.length > 0) {
    return (
      <div>
        {countries.map(country => 
          <CountryName key={country.name.common} country={country} info={props.info} />
        )}
      </div>
    )
  
  } else {
    return (
      <div>
        No countries found.
      </div>
    )
  }
}

export default ListCountries