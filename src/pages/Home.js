import React from "react";
import withAuth from "../components/withAuth";

const Home = () => (
	<div>
		<h1 className="title">This is the Home Page</h1>

	</div>
);

export default withAuth(Home);