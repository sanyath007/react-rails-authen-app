import React, { Component } from 'react'
import Registration from './auth/Registration'

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    // TODO update parent component
    this.props.handleLogin(data);
    // Redirect to /dashboard
    this.props.history.push("/dashboard");
  }

  render() {    
    return (
      <div>
        <h1>Home</h1><br/>
        <p>Status: {this.props.loggedInStatus}</p>

        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    )
  }
}
