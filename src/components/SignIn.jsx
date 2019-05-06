import React from "react";
import { authenticationService } from "../_services/authentication_service";

import { Form, Input, Button, Alert } from "antd";

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
    const { errors } = this.state;

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <React.Fragment>
        <div style={{ textAlign: "center" }}>
          <h1>Sign in</h1>
          {errors && (
            <div>
              <Alert
                message="Error"
                description={errors}
                type="error"
                showIcon
              />
            </div>
          )}
        </div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="E-mail:">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input name="email" onChange={this.handleChange} />)}
          </Form.Item>

          <Form.Item label="Name:">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Please input your name!",
                  whitespace: true
                }
              ]
            })(<Input name="name" onChange={this.handleChange} />)}
          </Form.Item>

          <Form.Item label="Nick:">
            {getFieldDecorator("nick", {
              rules: [
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true
                }
              ]
            })(<Input name="nick" onChange={this.handleChange} />)}
          </Form.Item>

          <Form.Item label="Password:">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                }
              ]
            })(
              <Input
                name="password"
                type="password"
                onChange={this.handleChange}
              />
            )}
          </Form.Item>

          <Form.Item label="Confirm Password:">
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                }
              ]
            })(
              <Input
                name="password_confirmation"
                type="password"
                onChange={this.handleChange}
              />
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}
const WrappedSignIn = Form.create({ name: "register" })(SignIn);
export default WrappedSignIn;
