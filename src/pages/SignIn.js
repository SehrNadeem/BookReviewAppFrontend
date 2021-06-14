import React, { Component } from 'react'
import { signIn } from '../services/auth-service';
import { Link, withRouter } from "react-router-dom";
import { setLocalStorage } from '../services/local-storage-service';
import { ActionCreators } from '../redux/actions';
import { connect } from 'react-redux';

class SignIn extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
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
    signIn(this.state).then(result => {

      if (result.data.auth_token) {
        setLocalStorage('token', result.data.auth_token)
        this.props.dispatch(ActionCreators.login(this.state));
        this.props.history.push(`/user/${this.state.username}`);
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Sign In Form</h1>
          <label>Username :</label>
          <input name='username' value={this.state.username} onChange={this.handleChange} />
          <label>Password :</label>
          <input type="password" name='password' value={this.state.password} onChange={this.handleChange} />
          {this.state.error ? <p style={{ color: 'red' }}>{this.state.error}</p> : null}
          <input type="submit" value="Sign In" />
        </form>
        <Link to="/signup">Create Account</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username
  }
}

export default connect(mapStateToProps)(withRouter(SignIn));