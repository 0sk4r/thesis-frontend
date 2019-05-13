import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../_helpers/auth_context";

function PrivateRoute({ component: Component, ...rest }) {
  const context =  useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={props =>
        context.isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;