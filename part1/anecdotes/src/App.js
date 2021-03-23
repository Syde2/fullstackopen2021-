import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  let [selected, setSelected] = useState(0)
  const handleVote= () => console.log('todo')
  const handleRandom= () => setSelected(selected = getRandomInt(0, anecdotes.length))
  const handleNext= () => setSelected(selected === anecdotes.length-1 ? selected = 0 :selected+1)
  const handlePrev= () => setSelected(selected === 0 ? selected = anecdotes.length-1: selected-1)


  /* Generate a random int with min and max value */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let int = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive

  return int;
}





return (
  <div>
    <h1>Anecdote of the day</h1>
    <article>
      {anecdotes[selected]}
    </article>
    <Nav  prev = { handlePrev }  vote = {handleVote} random = { handleRandom } next = { handleNext }  />
  </div>
)
 
}

const Nav = (props) => {
  return (
    <div className="nav">
      <Button function ={props.prev} name =  "prev" className = "nav-btn"/>      
      <Button function ={props.vote} name =  "vote"   />
      <Button function ={props.random} name = "random"  />
      <Button function ={props.next} name =  "next" className ="nav-btn"/>
    </div>
    );
}

const Button = (props) => {
  return (
    <button onClick={props.function} className={props.className} > { props.name }  </button>
    );
}




export default App