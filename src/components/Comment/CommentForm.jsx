import React, { useState } from "react";
import { withRouter } from "react-router";
import { Form, Button, Alert } from "antd";
import MentionComponent from "../shared/MentionComponent";
import { commentService } from "_services/comment_service";

// Form for creating new comments
function CommentForm(props) {
  // post id of parent post
  const { post_id } = props;

  const { getFieldDecorator } = props.form;

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Submit data to server
  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    commentService
      .create(post_id, content)
      .then(() => {
        setIsLoading(false);
        props.history.go(0);
      })
      .catch(error => {
        setIsLoading(false);
        const errors_messages = error.response.data.errors;
        setError(errors_messages);
      });
  }

  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>
        {/* Display error message from server */}
        {error && (
          <div>
            <Alert message="Error" description={error} type="error" showIcon />
          </div>
        )}
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Comment:" name="content">
          {getFieldDecorator("content", {
            rules: [
              {
                required: true,
                message: "Please enter content!",
                whitespace: true
              }
            ]
          })(<MentionComponent onChange={content => setContent(content)} />)}
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
