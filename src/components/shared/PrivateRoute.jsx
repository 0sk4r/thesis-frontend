import React, { useContext} from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "_helpers/auth_context";
import { withRouter } from "react-router-dom";
// Component restrict access to component for unauth users
function PrivateRoute({ component: Component, ...rest }) {
  const context = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        context.isAuth ? (
          <Component {...props} />
        ) : context.isLoading ? null : (
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

export default withRouter(PrivateRoute);
