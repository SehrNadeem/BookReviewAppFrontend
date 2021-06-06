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
import Home from './pages/Home';

class App extends Component {

	state = {
		user: {},
		error: ""
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
							<Route exact path="/home">
								<Home />
							</Route>

							<Route exact path="/user/:name">
								<User />
							</Route>

							<Route exact path="/user">
								<User />
							</Route>

							<Route path="/book">
								<Book />
							</Route>
						</div>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;