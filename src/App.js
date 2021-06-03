import 'react-native-gesture-handler';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Route, Switch} from "react-router-dom";
import "bulma/css/bulma.min.css";

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import User from './components/User';
import Book from './components/Book';
import {signUp, signIn, userLoggedIn} from './services/auth-service';

class App extends Component {

  state = {
    user: {},
    error: "",
    isReturningUser: false,
  }


  componentDidMount(){
    let token = localStorage.getItem('token')
    if(token){
      userLoggedIn
    }
  }

  render() {
    var welcomMessage = "Welcome";
    if (this.state.isReturningUser) {
      welcomMessage = welcomMessage + " back"
    }
    return (
      <BrowserRouter>
      <Navbar />
      <div className="App">
          
        {this.state.user.username ? <h2>{welcomMessage} {this.state.user.first_name} {this.state.user.last_name}</h2> : (
          <>
          <SignIn signIn={signIn} error={this.state.error} />
          <SignUp signUp={signUp} />
          </>)
        }

        <Switch>
          <Route exact path="/book">
            <Book />
          </Route>
          <Route path="/user">
            <User />
          </Route>
        </Switch>
      </div>

      </BrowserRouter>
    );
  } 
}

export default App;