import React from 'react'

const Course = (props) => {
  console.log('course', props);
  
    return (
      <div>
        <h1>Web dev curriculum</h1>
        <Header name={ props.course[0].name } />
        <Content parts={props.course[0].parts} /> 
        <Header name={ props.course[1].name } />
        <Content parts={props.course[1].parts} />  



      </div>
      );
  }
   
  const Header = (props) => {
    console.log('header',props.name);
    return ( 
      <div>
        <h2>{ props.name }</h2>
      </div>
     );
  }
  
  const Content = (props) => { 
    console.log('content', props); 
    return ( 
      <div>
        <Parts contents = { props } /> 
        <Total exercises = { props } />
       </div>
     );
  }
  
  const  Parts= (props) => {
    return (
      <div>
      {props.contents.parts.map((content)=>( 
        <div key={content.id}>  
         <p> {content.name} : {content.exercises} </p>
        </div>
      ))}
      </div>
      );
  }

  const Total = (props) => {
    return (
      <div>
       <b> Total of {props.exercises.parts.reduce( (sum,part)=> sum + part.exercises, 0)} exercices. </b>
      </div>
   
         );
    
  };
   





  export default Course;