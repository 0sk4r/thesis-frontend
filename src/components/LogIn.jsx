import React from "react";
import { authenticationService } from "../_services/authentication_service";

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }

    this.state = {
      email: "",
      password: "",
      errors: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const {email, password} = this.state;

    authenticationService.login(email, password)
    .then((response) =>{
      this.props.history.push("/");
    })
    .catch((error) => {

      const errors_messages = error.response.data.errors;
      this.setState({errors: errors_messages});
    });
  }

  render() {
    const { email, password, errors} = this.state;

    return (
      <div>
        <h2>Log in</h2>
        {
          errors &&
          <div>
            {errors}
          </div>
        }
        <form name="form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button>Log in</button>
          </div>
        </form>
      </div>
    );
  }
}
export default LogIn;
