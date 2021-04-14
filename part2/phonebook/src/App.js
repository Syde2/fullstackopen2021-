import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
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