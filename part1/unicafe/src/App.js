import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const itWasGood = () => setGood(good+1)
  const itWasOk = () => setNeutral(neutral+1);
  const itWasBad = () => setBad(bad+1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={itWasGood } name = "good"/>
      <Button handleClick={itWasOk } name = "neutral"/>
      <Button handleClick={itWasBad } name = "bad"/>
      <Statistics good = {good}  neutral = {neutral} bad = {bad} />
    </div>

  )
}

 
const  Button = (props) => {
  return (
    <button onClick={ props.handleClick }>{ props.name }</button>
    );
}

const Statistics = (props) => {
  const good = props.good;
  const bad = props.bad;
  const neutral = props.neutral;
  const all = good + neutral + bad;
  const average =  (good - bad) / all;
  const positivePerc = (good / all )*100

  if(all === 0){
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (  
    <div>
    <h1>statistics</h1>
    <table>
      <tbody>      
      <Statistic text = "good" value = { good }/>
      <Statistic text = "neutral" value = { neutral }/>
      <Statistic text = "bad" value = { bad }/> 
      <Statistic text = "all" value = { all }/>
      <Statistic text = "average" value = { average }/>
      <Statistic text = "positive" value = { positivePerc + "%" }/>
      </tbody>
    </table>
    </div>
  );
}
 



 
const Statistic = (props) => {
  return (
    <tr> 
      <td> {props.text}  </td>
      <td> {props.value} </td>
    </tr>  
    );
}

 


export default App