import React from "react";
import { authenticationService } from "../_services/authentication_service";
import { authenticationHelper } from "_helpers/auth_helpers";
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
    if (localStorage.getItem("user")) {
      authenticationService
        .validate()
        .then(() => {
          const user = JSON.parse(localStorage.getItem("user"));
          this.setState({
            isAuth: true,
            user: user,
            id: user.id
          });
        })
        .catch(error => {
          authenticationHelper.handleTokenChange(error.response);
          console.log(error);
          this.logout();
          localStorage.removeItem("user");
        });
    }
  }

  componentDidMount() {}

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

export { AuthContext, AuthProvider };
