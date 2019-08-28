import React, { useState } from "react";
import { withRouter } from "react-router";
import { Alert, Button, Form } from "antd";
import MentionComponent from "../shared/MentionComponent";
import { commentService } from "_services/comment_service";

// Form for creating new comments
function CommentForm(props) {
  // post id of parent post
  const { post_id, setComments } = props;

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Submit data to server
  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    setError("");
    setMessage("");
    commentService
      .create(post_id, content)
      .then(response => {
        const newComment = response.data;
        setComments(commentsList => [...commentsList, newComment]);
        setMessage("Comment successfully created!");
        setIsLoading(false);
      })
      .catch(error => {
        if (error.response.status === 500) {
          setIsLoading(false);
          setError(error.response.statusText);
        } else {
          setIsLoading(false);
          const errors_messages = error.response.data.errors;
          setError(errors_messages);
        }
      });

    // Clear input
    setContent("");
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
        {message && (
          <div>
            <Alert
              message="Success"
              description={message}
              type="success"
              showIcon
            />
          </div>
        )}
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Comment:" name="content">
          <MentionComponent
            value={content}
            onChange={content => setContent(content)}
          />
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

const WrappedCommentForm = Form.create()(CommentForm);
const WrappedComentFormWithRouter = withRouter(WrappedCommentForm);
export default WrappedComentFormWithRouter;
