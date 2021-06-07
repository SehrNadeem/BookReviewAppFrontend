import React, { Component } from 'react';
import { signUp } from '../services/auth-service';
import { withRouter } from "react-router-dom";
import { setLocalStorage } from '../services/local-storage-service';

class SignUp extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      error: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    signUp(this.state).then(result => {
      if (result.data.auth_token) {
        setLocalStorage('token', result.data.auth_token)
        let full_name = this.state.firstName + " " + this.state.lastName
        this.props.history.push(`/user/${full_name}`);
      }
      else {
        this.setState({
          error: result.failure
        })
      }
    }).catch(error => {
      this.setState({
        error: error.message
      })
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up Form</h1>
        <label>Username :</label>
        <input name='username' value={this.state.username} onChange={this.handleChange} />
        <label>Password :</label>
        <input name='password' type='password' value={this.state.password} onChange={this.handleChange} />
        <label>First Name :</label>
        <input name='firstName' value={this.state.firstName} onChange={this.handleChange} />
        <label>Last Name :</label>
        <input name='lastName' value={this.state.lastName} onChange={this.handleChange} />
        <input type='submit' value='Register' />
      </form>
    )
  }
}

export default withRouter(SignUp);