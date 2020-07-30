import React from 'react'

const Dashboard = (props) => {
  return (
    <div>
      <h1>Dashboard</h1><br/>
      <p>Status: {props.loggedInStatus}</p>
    </div>
  )
}

export default Dashboard
