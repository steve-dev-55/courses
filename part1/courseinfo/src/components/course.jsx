import React from 'react'

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = (props) => {
    return <h1>{props.course}</h1>
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </div>
    )
  }
  
  const Part = ({ part }) => {
    return <p>{part.name} {part.exercises}</p>
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => {
      return s + p.exercises
    }, 0)
    return (
      <p><strong>Number of exercises {total}</strong></p>
    )
  }

export default Course