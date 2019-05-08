import React, { useState } from "react";
import { postService } from "../../_services/post_service";
import { authenticationHelper } from "../../_helpers/auth_helpers";

import { Form, Input, Button, Alert } from "antd";
const { TextArea } = Input;

function PostForm(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoadin] = useState(false);
  const [error, setError] = useState("");

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

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoadin(true);

    postService
      .create(title, content)
      .then(response => {
        console.log(response);
        authenticationHelper.handleTokenChange(response)
        setIsLoadin(false);
        props.history.push("/");
      })
      .catch(error => {
        console.log(error.response)
        authenticationHelper.handleTokenChange(error.response);
        setIsLoadin(false)
        const errors_messages = error.response.data.errors;
        setError(errors_messages);
      });
  }

  const { getFieldDecorator } = props.form;

  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>
        <h1>New post</h1>
        {error && (
          <div>
            <Alert message="Error" description={error} type="error" showIcon />
          </div>
        )}
      </div>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="Title:">
          {getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: "Please enter title!",
                whitespace: true
              }
            ]
          })(<Input name="title" onChange={e => setTitle(e.target.value)} />)}
        </Form.Item>

        <Form.Item label="Content:">
          {getFieldDecorator("content", {
            rules: [
              {
                required: true,
                message: "Please enter content!",
                whitespace: true
              }
            ]
          })(<TextArea rows={10} name="content" onChange={e => setContent(e.target.value)} />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Create new post
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}

const WrappedPostForm = Form.create({ name: "new" })(PostForm);
export default WrappedPostForm;
