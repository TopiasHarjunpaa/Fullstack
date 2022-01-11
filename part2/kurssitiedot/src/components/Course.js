import React from "react"

const Header = ({ course }) => {
  return (
    <div>
      <h2>{course}</h2>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} amount={part.exercises} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const amounts = parts.map(part => part.exercises)
  const total = amounts.reduce((sum, amount) => sum + amount)
  return (
    <div>
      <h3>Total of exercises {total}</h3>
    </div>
  )
}

const Part = ({ name, amount }) => {
  return (
    <div>
      <p>{name} {amount}</p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course['parts']} />
      <Total parts={course['parts']} />
    </div>
  )
}

export default Course