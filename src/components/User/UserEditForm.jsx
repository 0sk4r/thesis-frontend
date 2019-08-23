import React, {useEffect, useState} from "react";
import {Alert, Avatar, Button, Col, Form, Input, Row} from "antd";
import {userService} from "../../_services/user_service";
import SingleFileUpload from "components/shared/SingleFileUpload";

// Form for user edit
function UserEditForm(props) {
  const {getFieldDecorator} = props.form;

  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [oldAvatar, setOldAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");

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

  // Fetch data about user for edit
  useEffect(() => {
    userService
      .edit()
      .then(response => {
        const user = response.data;
        setName(user.name);
        setNickname(user.nickname);
        setOldAvatar(user.image.url);
      })
      .catch(error => {
        setIsLoading(false);
        const errors_messages = error.response.data.errors;
        setErrors(errors_messages);
      });
  }, []);

  // Submit data to api
  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrors("");
    setMessage("");
    userService
      .update(name, nickname, avatar)
      .then(response => {
        setIsLoading(false);
        setMessage(response.data.message);
      })
      .catch(error => {
        setErrors(error.response.data.errors);
        setIsLoading(false);
      });
  }

  return (
    <React.Fragment>
      <div style={{textAlign: "center"}}>
        <h1>Edit user info</h1>
        {errors && (
          <div>
            <Alert message="Error" description={errors} type="error" showIcon/>
          </div>
        )}
        {message && (
          <div>
            <Alert message="Success" description={message} type="success" showIcon/>
          </div>
        )}
      </div>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="Name:">
          {getFieldDecorator("name", {
            initialValue: name,
            rules: [
              {
                required: true,
                message: "Please input your name!",
                whitespace: true
              }
            ]
          })(<Input name="name" onChange={e => setName(e.target.value)}/>)}
        </Form.Item>

        <Form.Item label="Nick:">
          {getFieldDecorator("nick", {
            initialValue: nickname,
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
              onChange={e => {
                setNickname(e.target.value)
              }}
              autoComplete="username"
            />
          )}
        </Form.Item>

        <Form.Item label="Avatar:">
          <Row>
            <Col span={20}>
              <SingleFileUpload setFile={setAvatar}/>
            </Col>
            <Col span={4}>
              <Avatar src={oldAvatar} size={64}/>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}

const WrappedUserEditForm = Form.create({name: "new"})(UserEditForm);
export default WrappedUserEditForm;
