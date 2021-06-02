import './App.css';
import { Component } from 'react';
// import { Redirect } from "react-router-dom";

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

class App extends Component {

  state = {
    user: {},
    error: "",
    isReturningUser: false,
  }


  signUp = user => {
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user:{
          username: user.username,
          password: user.password,
          first_name: user.firstName,
          last_name: user.lastName
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("token", data.jwt)
      this.setState({
        user: data.user
      })
    })

    const token = localStorage.getItem("token")

    if(token){
      fetch(`http://localhost:3000/user_is_authed`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => console.log(data))
    }

  }

  signIn = (user) => {
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {
                username: user.username,
                password: user.password
            }
        })
    })
    .then(response => response.json())
    .then(result => {
      console.log(result)
        if (result.jwt){
          console.log(result.user)
          localStorage.setItem('token', result.jwt)
          this.setState({
            user: result.user,
            isReturningUser: true
          })
        }
        else {
          console.log(result.user)
          this.setState({
            error: result.failure
          })
        }
    })
  }

  render() {
    var welcomMessage = "Welcome";
    if (this.state.isReturningUser) {
      welcomMessage = welcomMessage + " back"
    }
    return (
      <div className="App">
        
        {this.state.user.username ? <h2>{welcomMessage} {this.state.user.first_name} {this.state.user.last_name}</h2> : (
          <>
          <SignIn signIn={this.signIn} error={this.state.error} />
          <SignUp signUp={this.signUp} />
          </>)
        }
      </div>
    );
  } 
}

export default App;