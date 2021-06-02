import './App.css';
import { Component } from 'react';

import SignUp from './components/SignUp';

class App extends Component {

  state = {
    user: {}
  }

  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   if(token){
  //     fetch(`http://localhost:3000/auto_login`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     .then(resp => resp.json())
  //     .then(data => {
  //       setUser(data)
  //       // console.log(data)
  //     })
  //   }
  // }, []

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
      // props.handleLogin(data.user)
      // console.log("")
    })

    const token = localStorage.getItem("token")
    if(token){
      fetch(`http://localhost:3000/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(user => this.setState({user})
      )
    }
  }

  // console.log(user);

  // handleLogin = (user) => {
  //   setUser(user)
  // }

  render() {
    return (
      <div className="App">
        {this.state.user.username ? <h2>Welcome {this.state.user.first_name} {this.state.user.last_name}</h2> : 
          <SignUp signUp={this.signUp} />
        }
      </div>
    );
  } 
}

export default App;