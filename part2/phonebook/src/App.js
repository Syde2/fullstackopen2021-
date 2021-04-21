import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personservice from './services/personservice'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ query, setQuery ] = useState('')
  const [ message, setMessage] = useState(null)
  const [messagetype, setMessagetype] = useState('informative')
  

  useEffect(() => {
    personservice
      .getAll()
      .then( response =>{setPersons(response.data)})
  }, [persons.length])

  const handleFilter = (e) =>{
   let queryRequest= e.target.value
   setQuery(queryRequest)
  }

  const handleClick = (e) =>{
    e.preventDefault()
    let newPerson = {}
    if(newName !== "" ){
      newPerson = {name: newName.trim(), number: newNumber}
    }
    else{ 
      return notifyUser(`Please provide a valid name`, `error`)
    }
    checkDuplicate(newPerson)
  }

  const checkDuplicate =(newPerson) =>{
    let newPhone 
    persons.some(person => person.name === newPerson.name) ?
      newPhone = window.confirm(`${ newPerson.name } is already on the Phonebook, replace the old number with the new one ?`):
      personservice
        .create(newPerson)
        .then (()=>  {setPersons(() => [...persons,newPerson])})
        .then (()=> notifyUser(`${newPerson.name} added`, `informative`) )
    
    if (newPhone) {updatePhone(newPerson)}
  }

  const updatePhone = (newPerson) =>{
    const name= persons.find(person => person.name === newPerson.name)
    const modifiedPerson = {...name, number:newNumber}
    personservice
    .update(name.id, modifiedPerson)
    .then(() =>{ setPersons(persons.map(p=> p.name !==name.name ? p : modifiedPerson ))})
    .then ( ()=> notifyUser(`${newPerson.name} phone was updated`, `informative`))
    .catch(error => notifyUser(`Information about ${name.name} has been removed from server: (${error})`, `error`))
   }

  const deleteEntry = (id) =>{
    personservice
      .suppr(id)
      .then ( () => {
        const updatedPersons =persons.filter(p => p.id !== id)
        setPersons(updatedPersons)})
    }
  const notifyUser = (message,messagetype) =>{
    setMessage(message)
    setMessagetype(messagetype)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  

  }

  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message = {message} messagetype = {messagetype} />
      <Filter handleFilter = {handleFilter} />
      <PersonForm 
        setNewName = {setNewName}
        setNewNumber = {setNewNumber}
        handleClick = {handleClick} />
      <Persons 
        persons = {persons.filter(person => person.name.includes(query)) }
        deleteEntry = {deleteEntry}
      />
    
    </div>
  )
}

const PersonForm = ({setNewName,setNewNumber, handleClick}) => {
  return (
    <div className="add">
      <div className="subtitle">Add </div>
      <form>
        <input type="text" placeholder='name' onChange={ (e)=> setNewName (e.target.value)}/>
        <input type="tel" placeholder='phone' onChange={ (e)=> setNewNumber (e.target.value)}   />
        <button type="submit" onClick={ (e)=> handleClick(e) }> Add </button>
      </form>
      
    </div>
    );
}

const Persons = ({persons, deleteEntry }) => {
  return (
    <div className="persons">
      <div className="subtitle">Persons</div>
      <ul>
        {persons.map( person => 
        <li key={person.name}>
          <b> {person.name} </b>  <i> {person.number} </i> 
          <button className="del-button" onClick={(e)=> {deleteEntry( person.id)}} >X</button>
        </li>
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

const Notification = ({ message, messagetype }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messagetype}>
      {message}
    </div>
  )
}

export default App

