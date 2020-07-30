import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.checkLoginStatus();
  }
  checkLoginStatus() {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(res => {
        if(res.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: res.data.user
          });
        } else if (res.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          });
        }
      })
      .catch(err => console.log("Check Login errors ", err));
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }

  render() {
    return (
      <div className='app'>
        <Router>
          <Switch>
            <Route
              exact path="/"
              render={props => (
                <Home
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                />
              )
            } />
            <Route 
              exact path="/dashboard"
              render={props => (
                <Dashboard {...props} loggedInStatus={this.state.loggedInStatus} />
              )
            } />
          </Switch>
        </Router>
      </div>
    );
  }
}
