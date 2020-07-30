import React, { Component } from 'react'
import Registration from './auth/Registration'
import Login from './auth/Login'
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    // update parent component
    this.props.handleLogin(data);
    // Redirect to /dashboard
    this.props.history.push("/dashboard");
  }

  handleLogoutClick() {
    axios.delete("http://localhost:3001/logout", { withCredentials: true })
      .then(res => {
        this.props.handleLogout();        
      })
      .catch(err => console.log("Logout errors ", err));
  }

  render() {    
    return (
      <div>
        <h1>Home</h1><br/>
        <p>
          Status: {this.props.loggedInStatus} 
          { this.props.loggedInStatus === "LOGGED_IN" && <span><button onClick={this.handleLogoutClick}>Log out</button></span> }
        </p>
        
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} /><br/>

        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    )
  }
}
