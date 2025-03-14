import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  const {good, neutral, bad} = props
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  if (all === 0) {
    return <div>No feedback given</div>
  }

  return (
    <table>
      <tbody>
      <StatisticLine text="good" value={good} /> 
      <StatisticLine text="neutral" value={neutral} /> 
      <StatisticLine text="bad" value={bad} /> 
      <StatisticLine text="all" value={all} /> 
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={`${positive} %`} />      
      </tbody>
    </table>
  )
}

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 0)
  const increaseBad = () => setBad(bad - 1)

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => increaseGood()} text="good" />
      <Button handleClick={() => increaseNeutral()} text="neutral" />   
      <Button handleClick={() => increaseBad()} text="bad" />
      
      <h1>statistics</h1> 
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
