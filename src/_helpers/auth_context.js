import React from "react";
import {authenticationService} from "../_services/authentication_service";
import {authenticationHelper} from "_helpers/auth_helpers";

const AuthContext = React.createContext({
  isAuth: false,
  user: {}
});

// Context providing info about logged user
class AuthProvider extends React.Component {
  state = {
    isAuth: false,
    user: {}
  };

  // On creating check if stored tokens are valid
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    if (localStorage.getItem("user")) {
      authenticationService
        .validate()
        .then(() => {
          // if token is valid auth user in cotext
          const user = JSON.parse(localStorage.getItem("user"));
          this.setState({
            isAuth: true,
            user: user,
            id: user.id
          });
        })
        .catch(error => {
          // if token is invalid remove it from localstorage and logout in context
          authenticationHelper.handleTokenChange(error.response);
          this.logout();
          localStorage.removeItem("user");
        });
    }
  }

  componentDidMount() {
  }

  // Set login data
  login(user) {
    this.setState({
      isAuth: true,
      user: user
    });
  }

  // Remove data form context after logout
  logout() {
    this.setState({
      isAuth: false,
      user: {}
    });
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          user: this.state.user,
          id: this.state.id,
          loginContext: this.login,
          logoutContext: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export {AuthContext, AuthProvider};
