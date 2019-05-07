import React from "react";
import { authenticationService } from "../_services/authentication_service";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isAuth: false,
    user: {}
  };

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("user")) {
      authenticationService
        .validate()
        .then(response => {
          this.setState({
            isAuth: true,
            user: JSON.parse(localStorage.getItem("user"))
          });
        })
        .catch(error => {
          this.logout();
          localStorage.removeItem("user");
        });
    }
  }

  login(user) {
    this.setState({
      isAuth: true,
      user: user
    });
  }

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
          loginContext: this.login,
          logoutContext: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthContext, AuthProvider };
