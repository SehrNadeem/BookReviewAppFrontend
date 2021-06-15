import React from "react";
import { Redirect } from "react-router-dom";
import { getLocalStorage } from '../services/local-storage-service';

const withAuth = (Component) => {
  const AuthRoute = (props) => {
    if (getLocalStorage("token")) {
      return <Component {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  };

  return AuthRoute;
};

export default withAuth;