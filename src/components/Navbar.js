import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { removeLocalStorage } from '../services/local-storage-service';

const Navbar = ({ history }) => {

	const logoutUser = () => {
		removeLocalStorage("token");
		history.push("/");
	};

	return (
		<nav
			className="navbar is-primary"
			role="navigation"
			aria-label="main navigation"
		>
			<div className="container">
				<div className="navbar-brand">
					<a
						role="button"
						className="navbar-burger burger is-active"
						aria-label="menu"
						aria-expanded="false"
					>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>

				<div className="navbar-menu is-active">
					<div className="navbar-start">
						<NavLink
							className="navbar-item"
							activeClassName="is-active"
							to="/home"
							exact
						>
							Home
						</NavLink>

						<NavLink
							className="navbar-item"
							activeClassName="is-active"
							to="/user"
						>
							Profile
						</NavLink>

						<NavLink
							className="navbar-item"
							activeClassName="is-active"
							to="/book"
						>
							Books
						</NavLink>
					</div>

					<div className="navbar-end">
						<div className="navbar-item">
							<div className="buttons">
								<button className="button is-black" onClick={logoutUser}>
									Log out
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default withRouter(Navbar);