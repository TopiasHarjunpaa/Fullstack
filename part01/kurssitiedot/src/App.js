import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  const parts = props.parts
  return (
    <div>
      <Part name={parts[0].name} amount={parts[0].exercises}/>
      <Part name={parts[1].name} amount={parts[2].exercises}/>
      <Part name={parts[2].name} amount={parts[1].exercises}/>
    </div>
  )
}

const Total = (props) => {
  const amounts = props.parts.map(p => p.exercises)
  return (
    <div>
      <p>Number of exercises {amounts[0] + amounts[1] + amounts[2]}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.amount}</p>
    </div>
  )
}

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
      <Header course={course.name} />
      <Content parts={course['parts']} />
      <Total parts={course['parts']} />
    </div>
  )
}

export default App