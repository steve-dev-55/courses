import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
const [countries, setCountries] = useState([])
const [search, setSearch] = useState('')
const [show, setShow] = useState(false)
const [country, setCountry] = useState({})
const [weather, setWeather] = useState({})
const api_key = process.env.REACT_APP_API_KEY

useEffect(() => {
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
}, [])

const handleSearchChange = (event) => {
  setSearch(event.target.value)
  setShow(false)
}

const handleClick = (name) => {
  setShow(true)
  const country = countries.find(country => country.name.common === name)
  setCountry(country)
  axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
    .then(response => {
      setWeather(response.data)
    })
}

  return (
    <div>

   <h2>Find countries</h2>
find: <input value={search} onChange={handleSearchChange} />
{countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())).length > 10 ? <p>Too many matches, specify another filter</p> :
countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())).length === 1 ?
<div>
  <h1>{countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))[0].name.common}</h1>
  <p>capital {countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))[0].capital[0]}</p>
  <p>population {countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))[0].population}</p>
  <h2>languages</h2>
  <ul>
    {Object.values(countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))[0].languages).map(language => <li key={language}>{language}</li>)}
  </ul>
  <img src={countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))[0].flags.png} alt='flag' width='100px' />
  <h2>Weather in {countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))[0].capital[0]}</h2>
  <p><b>temperature:</b> {weather.current.temperature} Celsius</p>
  <img src={weather.current.weather_icons} alt='weather icon' />
  <p><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
</div> :
countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())).map(country => 
<div key={country.name.common}>{country.name.common} 
<button onClick={() => handleClick(country.name.common)}>show</button></div>)}
    </div>
  )
}

export default App
