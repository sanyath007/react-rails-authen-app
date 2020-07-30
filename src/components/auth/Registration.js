import React, { Component } from 'react'
import axios from 'axios';

export default class Registration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
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
    
    const { email, password, password_confirmation } = this.state;

    axios.post("http://localhost:3001/registrations", {
      user: {
        email,
        password,
        password_confirmation
      }
    }, {
      withCredentials: true
    }).then(res => {
      if(res.data.status === 'created') {
        this.props.handleSuccessfulAuth(res.data)
      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          <input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
