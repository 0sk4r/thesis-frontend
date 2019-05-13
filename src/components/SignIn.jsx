import React from "react";

import { authenticationService } from "../_services/authentication_service";
import { AuthContext } from "../_helpers/auth_context";

import { Form, Input, Button, Alert} from "antd";

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
      errors: "",
      isLoading: false,
      file: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleFileChange(e) {
    this.setState({ file: e.target.files[0] });
    return false;
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ isLoading: true });

    const {
      email,
      nick,
      name,
      password,
      password_confirmation,
      file
    } = this.state;

    authenticationService
      .signin(email, nick, name, password, password_confirmation, file)
      .then(response => {
        this.setState({ isLoading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ isLoading: false });
        const errors_messages = error.response.data.errors.full_messages;
        this.setState({ errors: errors_messages });
      });
  }

  componentDidMount() {
    if (this.context.isAuth) {
      this.props.history.push("/");
    }
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
            })(
              <Input
                name="email"
                onChange={this.handleChange}
                autoComplete="email"
              />
            )}
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
            })(
              <Input
                name="nick"
                onChange={this.handleChange}
                autoComplete="username"
              />
            )}
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
                autoComplete="new-password"
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
                autoComplete="new-password"
              />
            )}
          </Form.Item>

          <Form.Item label="Avatar:">
            <Input type="file" onChange={this.handleFileChange} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.isLoading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}

SignIn.contextType = AuthContext;

const WrappedSignIn = Form.create({ name: "register" })(SignIn);
export default WrappedSignIn;
