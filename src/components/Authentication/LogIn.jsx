import React from "react";
import {authenticationService} from "_services/authentication_service";
import {Alert, Button, Form, Input} from "antd";
import {AuthContext} from "_helpers/auth_context";

// Component handling Login action
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

  // Handle input change
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  // If user is logged redirect to root
  componentDidMount() {
    if (this.context.isAuth) {
      this.props.history.push("/");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({isLoading: true});
    const {email, password} = this.state;

    authenticationService
      .login(email, password)
      .then(user => {
        this.setState({isLoading: false});
        // Login user in context
        this.context.loginContext(user);
        // Redirect to root after login
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          let error_messages = "";
          if (error.response.status === 500) {
            error_messages = "Something went wrong. Try again later";
          } else {
            error_messages = error.response.data.errors;
          }
          this.setState({isLoading: false, errors: error_messages});
        } else if (error.request) {
          this.setState({isLoading: false, errors: "Backend not responding"});
        }
      });
  }

  render() {
    const {errors} = this.state;

    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 8}
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
        <div style={{textAlign: "center"}}>
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

const WrappedLogIn = Form.create({name: "login"})(LogIn);
export default WrappedLogIn;
