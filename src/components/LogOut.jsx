import React from "react";
import { authenticationService } from "../_services/authentication_service";
import { AuthContext } from "../_helpers/auth_context";

import { Spin, Alert } from "antd";

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
    this.setState({ isLoading: true });
    this.setState({ isLoading: false });
    this.context.logoutContext();
    this.props.history.push("/");
    localStorage.removeItem("user");
  }

  componentDidMount() {
    this.logout();
  }
  render() {
    const { isLoading, error } = this.state;

    if (error) {
      return (
        <Alert message="Error" description={error} type="error" showIcon />
      );
    }

    if (isLoading) {
      return (
        <div>
          <h1>Log out</h1>
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div>
        <h1>Log out</h1>
        <Spin size="large" />
      </div>
    );
  }
}
LogOut.contextType = AuthContext;

export default LogOut;
