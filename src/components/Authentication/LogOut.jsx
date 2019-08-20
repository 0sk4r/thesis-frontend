import React from "react";
import {AuthContext} from "_helpers/auth_context";
import {authenticationService} from "_services/authentication_service";
import {Alert, Spin} from "antd";

// Componet responsible for logout
class LogOut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: "",
      isLoading: false
    };

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.setState({isLoading: true});

    authenticationService
      .logout()
      .then(response => {
        this.setState({isLoading: false});
        // Logout user in cotext
        this.context.logoutContext();
        // Redirect logout user to root
        this.props.history.push("/");
        //  Remove data from localstorage
        localStorage.removeItem("user");
      })
      .catch(error => {
        this.setState({isLoading: false, error: error.response.data.errors});
      });
  }

  componentDidMount() {
    this.logout();
  }

  render() {
    const {isLoading, error} = this.state;

    if (error) {
      return (
        <Alert message="Error" description={error} type="error" showIcon/>
      );
    }

    if (isLoading) {
      return (
        <div>
          <h1>Log out</h1>
          <Spin size="large"/>
        </div>
      );
    }

    return (
      <div>
        <h1>Log out</h1>
        <Spin size="large"/>
      </div>
    );
  }
}

LogOut.contextType = AuthContext;

export default LogOut;
