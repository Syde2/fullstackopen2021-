import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {
  const [countries,setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState([])

  useEffect( ()=> {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then( response => {
      let restcountries = response.data
      setCountries( ()=> restcountries.filter(country => query!=='' ? country.name.includes(query):false) );
    })
  },[query])

  useEffect(() => {
    
    axios
    .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${query}`)
    .then( response => {
      setWeather( ()=>response.data)   
    }) 
    return
  }, [query])

  const handleFilter = (e) =>{
    setQuery( e.target.value)
  }

  const handleShowBtn = (country) =>{
    setQuery(country)
  }

  return (
    <div className="App">
      <h1> Countries</h1>
      <Filter handleFilter = {handleFilter} />
      <List countries = {countries} handleShowBtn={handleShowBtn}  weather = {weather} />  
    </div>
  );
}

const Filter = ({handleFilter}) => {
  return ( 
    <div className="filter">
      <input type="text"
      placeholder="find country"
      autoFocus
      autoCapitalize="true"
      onChange={ (e) =>  handleFilter(e)  }
      />
    </div>
   );
}
 
const List = ({countries,handleShowBtn,weather}) => {
  let matches = countries.length

  if(matches > 10){
    return <TooMany />
  }
  else if (matches === 1){
    return <DetailledList  countries = {countries} weather={weather} />
  }
  else {
    return <StandardList handleShowBtn = {handleShowBtn} countries = {countries} />
  }

}

const TooMany = () => {
  return ( 
    <p>Too many matches,specify another filter</p>
   );
}
const DetailledList = ({countries,weather}) => {
  return ( 
    <div>
      {countries.map( country =>
        <div key={country.name}> 
        <h1> {country.name} </h1>
        <p> Capital :  { country.capital } </p>      
        <p> Population :  { country.population } </p>
        <p> <b>Languages</b></p>
        <ul>
          {country.languages.map(lang => 
            <li key={lang.name}> {lang.name}</li>
            )}    
        </ul>
        <img src={country.flag} alt="country flag" height="150px" width="225px"/>   
        </div>
        )}

        <Weather weather = {weather} />

      </div>       
         )  }


const StandardList = ({countries,handleShowBtn}) => {

  return ( 
    countries.map( country =>
      <div key={country.name}> 
      {country.name}
      <button onClick={ ()=> handleShowBtn(country.name) }>show </button>
      </div>
      )
   );
}

const Weather = ({weather}) => {
  return (
    <div key={weather.location.name}> 
    <h2> Weather in {weather.location.name}  </h2>
    <p>Temperature : {weather.current.temperature}°C </p>
    <p>Description : {weather.current.weather_descriptions}</p>
    <img src={weather.current.weather_icons} alt="weather icon"/>
    <p> Wind :  {weather.current.wind_speed} {weather.current.wind_dir} </p>
  </div>
    );
}
 



export default App;
