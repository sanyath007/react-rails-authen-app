import React, { Component } from 'react'
import Registration from './auth/Registration'
import Login from './auth/Login'

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    // update parent component
    this.props.handleLogin(data);
    // Redirect to /dashboard
    this.props.history.push("/dashboard");
  }

  render() {    
    return (
      <div>
        <h1>Home</h1><br/>
        <p>Status: {this.props.loggedInStatus}</p>
        
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} /><br/>

        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    )
  }
}
