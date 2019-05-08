import React from "react";
import { authenticationService } from "../_services/authentication_service";
import { Form, Input, Button, Alert } from "antd";
import { AuthContext } from "../_helpers/auth_context";

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: "",
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    if (this.context.isAuth) {
      this.props.history.push("/");
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    const { email, password } = this.state;

    authenticationService
      .login(email, password)
      .then(user => {
        this.setState({ isLoading: false });
        this.context.loginContext(user);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ isLoading: false });
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
          <h1>Log in</h1>
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
                autoComplete="current-password"
              />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.isLoading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}

LogIn.contextType = AuthContext;

const WrappedLogIn = Form.create({ name: "login" })(LogIn);
export default WrappedLogIn;
