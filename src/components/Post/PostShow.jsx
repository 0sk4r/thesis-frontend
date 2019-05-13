import React, { useState, useEffect } from "react";
import { postService } from "../../_services/post_service";
import { Alert } from "antd";

function PostShow(props) {
  const { match } = props;
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    setIsLoading(true);
    postService
      .get(match.params.id)
      .then(response => {
        setIsLoading(false);
        setPost(response.data);
        setUser(response.data.user);
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response) {
          if (error.response.status === 404) {
            setErrors("Post not found!");
          } else {
            const error_messages = error.response.data.errors.full_messages;
            setErrors(error_messages);
          }
        } else if (error.request) {
          setErrors("Something went wrong. Try again later.");
        }
      });
  }, [match.params.id]);

  return isLoading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : errors ? (
    <div>
      <Alert message="Error" description={errors} type="error" showIcon />
    </div>
  ) : (
    <React.Fragment>
      <h1>{post.title}</h1>
      <p>by {user.name}</p>
      <p> {post.content} </p>
    </React.Fragment>
  );
}

export default PostShow;
