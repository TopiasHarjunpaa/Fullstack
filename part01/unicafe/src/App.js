import React, { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ feedbacks }) => {
  const all = feedbacks[0] + feedbacks[1] + feedbacks[2]
  const average = (feedbacks[0] - feedbacks[2]) / all
  const positive = (feedbacks[0] / all)

  if (all <= 0) {
    return (
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
        <StatisticLine text='good' value={feedbacks[0]}/>
        <StatisticLine text='neutral' value={feedbacks[1]}/>
        <StatisticLine text='bad' value={feedbacks[2]}/>
        <StatisticLine text='all' value={all}/>
        <StatisticLine text='average' value={average}/>
        <StatisticLine text='positive' value={positive.toString() + ' %'}/>
      </table>
    </div>

  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>
      <Statistics feedbacks={[good, neutral, bad]}/>
    </div>
  )
}

export default App
