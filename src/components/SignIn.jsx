import React from "react";
import { authenticationService } from "../_services/authentication_service";

import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import { from } from "rxjs";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      nick: "",
      name: "",
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

    const { email, nick, name, password, password_confirmation } = this.state;

    authenticationService
      .signin(email, nick, name, password, password_confirmation)
      .then(response => {
        this.props.history.push("/");
      })
      .catch(error => {
        const errors_messages = error.response.data.errors.full_messages;
        this.setState({ errors: errors_messages });
      });
  }

  render() {
    const {
      email,
      password,
      password_confirmation,
      nick,
      name,
      errors
    } = this.state;

    return (
      <React.Fragment>
        <h2>Sign in</h2>
        {errors && <div>{errors}</div>}
        <Form onSubmit={this.handleSubmit}>
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
            <label htmlFor="nick">Nick</label>
            <input
              type="text"
              name="nick"
              value={nick}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
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
            <label htmlFor="password_confirmation">Password confirmation</label>
            <input
              type="password"
              name="password_confirmation"
              value={password_confirmation}
              onChange={this.handleChange}
            />
          </div>
          <Form.Item>
            {/* <button>Sign in</button> */}
            <Button type="primary" htmlType="submit">Register</Button>
          </Form.Item>
        </Form>
        </React.Fragment>
    );
  }
}
export default SignIn;
