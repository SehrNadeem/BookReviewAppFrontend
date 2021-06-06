import React from "react";
import withAuth from "../components/withAuth";

const Book = () => (
	<div>
		<h1 className="title">This is the Book Page</h1>

	</div>
);

export default withAuth(Book);