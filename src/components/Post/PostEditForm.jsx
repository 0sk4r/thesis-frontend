import React, { useEffect, useState } from "react";
import { postService } from "_services/post_service";
import CategorySelect from "../Category/CategorySelect";
import { Alert, Button, Form, Input } from "antd";
import SingleFileUpload from "components/shared/SingleFileUpload";

const { TextArea } = Input;

// Form for post edditing
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

  // Fetch data about post to eddit
  useEffect(() => {
    postService
      .edit(match.params.id)
      .then(response => {
        const post = response.data;

        setPostId(post.id);
        setTitle(post.title);
        setContent(post.content);
        setCategoryId(post.category.id);
      })
      .catch(error => {
        const response = error.response;

        if (response.status === 404) {
          setError("Post for edition not found");
        } else if (response.status === 401) {
          setError("You are not allowed to do this");
        } else {
          const errors_messages = error.response.data.errors;
          setError(errors_messages);
        }
      });
  }, [match.params.id]);

  // Submit updated post
  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    postService
      .update(title, content, file, categoryId, postId)
      .then(() => {
        setIsLoading(false);
        props.history.push(`/posts/${postId}`);
      })
      .catch(error => {
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
              <SingleFileUpload setFile={setFile} />
            </Form.Item>

            <Form.Item label="Category:">
              <CategorySelect
                handleCategoryChange={id => setCategoryId(id)}
                defaultValue={categoryId}
              />
            </Form.Item>

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
