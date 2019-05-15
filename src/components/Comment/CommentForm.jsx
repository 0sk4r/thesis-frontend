import React, { useState } from "react";
import { withRouter } from "react-router";

import { Form, Input, Button, Alert } from "antd";
import { authenticationHelper } from "../../_helpers/auth_helpers";

import { commentService } from "../../_services/comment_service";

const { TextArea } = Input;

function CommentForm(props) {
  const { post_id } = props;

  const { getFieldDecorator } = props.form;

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    commentService
      .create(post_id, content)
      .then(response => {
        console.log(response);
        authenticationHelper.handleTokenChange(response);
        setIsLoading(false);
        props.history.go(0);
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
        authenticationHelper.handleTokenChange(error.response);
        setIsLoading(false);
        const errors_messages = error.response.data.errors;
        setError(errors_messages);
      });
  }
  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>
        {error && (
          <div>
            <Alert message="Error" description={error} type="error" showIcon />
          </div>
        )}
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Comment:">
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

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Create comment
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}

const WrappedCommentForm = Form.create({ name: "new" })(CommentForm);
const WrappedComentFormWithRouter = withRouter(WrappedCommentForm);
export default WrappedComentFormWithRouter;

