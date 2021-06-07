import React from "react";
import withAuth from "../components/withAuth";
import { useParams } from "react-router-dom";

const User = () => {
  const { name } = useParams();
  return (
    <div>
      <h1 className="title">Welcome {name}</h1>
    </div>
  );
};

export default withAuth(User);