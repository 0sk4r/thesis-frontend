import React, { useState, useEffect } from "react";
import { postService } from "../../_services/post_service";
import { authenticationHelper } from "../../_helpers/auth_helpers";

import CategorySelect from "../shared/CategorySelect";
import { Form, Input, Button, Alert } from "antd";
const { TextArea } = Input;

function PostEditForm(props) {
  const { match } = props;
  const [postId, setPostId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  
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

  useEffect(() => {
    postService
      .edit(match.params.id)
      .then(response => {
        authenticationHelper.handleTokenChange(response);
        const post = response.data;

        setPostId(post.id);
        setTitle(post.title);
        setContent(post.content);
        setCategoryId(post.category.id);
      })
      .catch(error => {
        console.log(error.response);
        authenticationHelper.handleTokenChange(error.response);

        const response = error.response;

        if (response.status === 404) {
          setError("Post for edition not found");
        }
        else if (response.status === 401){
          setError("You are not allowed to do this");
        }
        else {
          const errors_messages = error.response.data.errors;
          setError(errors_messages);
        }
      });
  }, [match.params.id]);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    postService
      .update(title, content, file, categoryId, postId)
      .then(response => {
        authenticationHelper.handleTokenChange(response);
        setIsLoading(false);
        props.history.push(`/posts/${postId}`);
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
      {error ? (
        <React.Fragment>
          <div style={{ textAlign: "center" }}>
            <div>
              <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
              />
            </div>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Form {...formItemLayout} onSubmit={handleSubmit}>
            <Form.Item label="Title">
              {getFieldDecorator("title", {
                initialValue: title,
                rules: [
                  {
                    required: true,
                    message: "Please enter title!",
                    whitespace: true
                  }
                ]
              })(
                <Input name="title" onChange={e => setTitle(e.target.value)} />
              )}
            </Form.Item>

            <Form.Item label="Content:">
              {getFieldDecorator("content", {
                initialValue: content,
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

            <CategorySelect
              handleCategoryChange={id => setCategoryId(id)}
              defaultValue={categoryId}
            />

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Update post
              </Button>
            </Form.Item>
          </Form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

const WrappedPostEditForm = Form.create({ name: "new" })(PostEditForm);
export default WrappedPostEditForm;
