import React, { useState, useEffect } from "react";
import { postService } from "../../_services/post_service";
import PostContainer from "./PostContainer";
import { List, Alert } from "antd";

function PostList(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    setIsLoading(true);
    postService
      .getAll()
      .then(response => {
        setIsLoading(false);
        setPosts(response.data);
      })
      .catch(error => {
        setIsLoading(false);

        if (error.response) {
          const error_messages = error.response.data.errors.full_messages;
          setErrors(error_messages);
        } else if (error.request) {
          setErrors("Something went wrong. Try again later.");
        }

      });
  }, []);

  return (
    errors ? (
      <div>
      <Alert message="Error" description={errors} type="error" showIcon />
    </div>
    ) : (
    <List itemLayout="vertical" size="large" loading={isLoading}>
      {posts.map(post => (
        <PostContainer post={post} key={post.id} />
      ))}
    </List>
    )
  );
}

export default PostList;
