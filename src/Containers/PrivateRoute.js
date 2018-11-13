import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "./AuthService";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const Auth = new AuthService();

  const currentUser = () => {
    if (Auth.loggedIn()) {
      return Auth.getProfile();
    } else {
      Auth.logout();
      return false;
    }
  };

  return (
    <Route
      {...rest}
      render={props =>
        currentUser() ? (
          <Component currentUser={currentUser} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
