import React from 'react'


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = { course.name }/>
      <Content parts = { course.parts }/>
      <Total parts ={ course.parts } /> 
    </div>
  )
}

const Header = (props) => {
  return ( 
    <div>
      <h1>{ props.course }</h1>
    </div>
   );
}

const Content = (props) => {
  return ( 
    <div>
      <Parts  parts={props.parts[0].name} exercices={props.parts[0].exercises}/>
      <Parts  parts={props.parts[1].name} exercices={props.parts[1].exercises}/>
      <Parts  parts={props.parts[2].name} exercices={props.parts[2].exercises}/>

    </div>
   );
}

const Total = (props) => {
  return (
    <div>
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises }</p>
    </div>
    );
}

const  Parts= (props) => {
  return (
    <p>
      {props.parts} {props.exercices}
    </p>
    );
}
 

 
export default App;