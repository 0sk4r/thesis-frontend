import React, { useState, useEffect } from "react";
import { postService } from "_services/post_service";
import PostListContainer from "./PostListContainer";

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
          let error_messages = "";
          if (error.response.status === 500) {
            error_messages = "Backend not responding";
          } else {
            error_messages = error.response.data.errors.full_messages;
          }
          setErrors(error_messages);
        } else if (error.request) {
          setErrors("Something went wrong. Try again later.");
        }
      });
  }, []);

  return (
    <PostListContainer posts={posts} isLoading={isLoading} errors={errors} />
  );
}

export default PostList;
