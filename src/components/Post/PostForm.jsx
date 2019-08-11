import React, { useState } from "react";
import { postService } from "_services/post_service";
import { authenticationHelper } from "_helpers/auth_helpers";
import CategorySelect from "../shared/CategorySelect";
import { Form, Input, Button, Alert } from "antd";
const { TextArea } = Input;

function PostForm(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [categoryId, setCategoryId] = useState(null)
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

  function handleFileChange(e) {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    postService
      .create(title, content, file, categoryId)
      .then(response => {
        authenticationHelper.handleTokenChange(response);
        setIsLoading(false);
        props.history.push(`/posts/${response.data.post.id}`);
      })
      .catch(error => {
        authenticationHelper.handleTokenChange(error.response);
        setIsLoading(false);
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
          })(
            <TextArea
              rows={10}
              name="content"
              onChange={e => setContent(e.target.value)}
            />
          )}
        </Form.Item>

        <Form.Item label="Image:">
          <Input type="file" onChange={handleFileChange} />
        </Form.Item>
        
        <Form.Item label="Category:">
          <CategorySelect handleCategoryChange={id => setCategoryId(id)}/>
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
