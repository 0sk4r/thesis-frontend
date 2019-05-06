import React from "react";
import { authenticationService } from "../_services/authentication_service";
import { Form, Input, Button, Alert } from "antd";

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

    const { email, password } = this.state;

    authenticationService
      .login(email, password)
      .then(response => {
        this.props.history.push("/");
      })
      .catch(error => {
        const errors_messages = error.response.data.errors;
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
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}
const WrappedLogIn = Form.create({ name: "login" })(LogIn);
export default WrappedLogIn;
