import 'react-native-gesture-handler';
import './App.css';
import "bulma/css/bulma.min.css";
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import User from './pages/User';
import Book from './pages/Book';
import BooksList from './components/BooksList';
import BookDisplay from './components/BookDisplay';
import Review from './components/Review';
import BookReviews from './components/BookReviews';

class App extends Component {

  constructor(){
    super()
    this.state = {
      user: {},
      error: ""
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <div>
              <Navbar />
              <Route exact path="/user/:name">
                <User />
              </Route>

              <Route exact path="/user">
                <User />
              </Route>

              <Route path="/book">
                <Book />
              </Route>

              <Route exact path="/bookslist">
                <BooksList />
              </Route>

              <Route exact path="/bookslist/:page">
                <BooksList />
              </Route>

              <Route exact path="/bookdisplay/:id">
                <BookDisplay />
              </Route>

              <Route exact path="/review/:book_id">
                <Review />
              </Route>

              <Route exact path="/bookreviews/:id">
                <BookReviews />
              </Route>
            </div>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;