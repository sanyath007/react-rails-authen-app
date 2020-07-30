import React, { Component } from 'react'
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    event.preventDefault();
    
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    
    const { email, password } = this.state;

    axios.post("http://localhost:3001/sessions", {
      user: {
        email,
        password
      }
    }, {
      withCredentials: true
    }).then(res => {
      if(res.data.logged_in) {
        this.props.handleSuccessfulAuth(res.data)
      }
    }).catch(err => {
      console.log("Login errors ", err);
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}
