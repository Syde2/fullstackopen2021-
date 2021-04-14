import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [ persons, setPersons ] = useState([]) 

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then( response =>{setPersons(response.data)})
  }, [])


  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ query, setQuery ] = useState('')

  const handleFilter = (e) =>{
   let queryRequest= e.target.value
   setQuery(queryRequest)
  }

  const handleClick = (e) =>{
    e.preventDefault()
    let newPerson = {name: newName, number: newNumber}
    persons.some(person => person.name === newPerson.name) ?
      alert(`${newPerson.name } is already on the Phonebook`):
      setPersons(() => [...persons,newPerson])
    e.target.parentNode.reset()
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilter = {handleFilter} />
      <PersonForm 
        setNewName = {setNewName}
        setNewNumber = {setNewNumber}
        handleClick = {handleClick} />
      <Persons persons = {persons.filter(person => person.name.includes(query)) }/>
    
    </div>
  )
}

const PersonForm = ({setNewName,setNewNumber, handleClick}) => {
  return (
    <div className="form">
      <div className="subtitle">Add </div>
      <form>
        <input type="text" placeholder='name' onChange={ (e)=> setNewName (e.target.value)}/>
        <input type="tel" placeholder='phone' onChange={ (e)=> setNewNumber (e.target.value)}   />
        <input type="submit" value="add" onClick={ (e)=> handleClick(e) }/>
      </form>
      
    </div>
    );
}

const Persons = ({persons}) => {
  return (
    <div className="persons">
      <div className="subtitle">Persons</div>
      <ul>
        {persons.map( person => 
        <li key={person.name}> <b> {person.name} </b>  <i> {person.number} </i> </li>
        )}
      </ul>
    </div>
    );
}
 
const Filter = ({handleFilter}) => {
  return ( 
    <div className="filter">
      <div className="subtitle">Filter</div>
      <input type="text"
      placeholder="search"
      onChange={ (e)=> handleFilter(e) }
      />
  
    </div>
   );
}
 


export default App