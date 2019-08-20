import React, {useEffect, useState} from "react";
import {postService} from "_services/post_service";
import {Alert, List} from "antd";
import CommentComponent from "../Comment/CommentComponent";
import PostContainer from "./PostContainer";

// Component responsible for displaying post and comments
function PostShow(props) {
  const {match} = props;
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState("");

  // Fetch post data from backend
  useEffect(() => {
    setIsLoading(true);

    postService
      .get(match.params.id)
      .then(response => {
        setPost(response.data);
        setComments(response.data.comment);
        setIsLoading(false);
      })
      .catch(error => {
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
        setIsLoading(false);
      });
  }, [match.params.id]);

  // Display loading status until fetch end
  if (isLoading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  // Display error message
  if (errors)
    return (
      <div>
        <Alert message="Error" description={errors} type="error" showIcon/>
      </div>
    );

  return (
    <React.Fragment>
      <List itemLayout="vertical" size="large" loading={isLoading}>
        <PostContainer post={post}/>
      </List>
      {/* Pass comment data */}
      <CommentComponent post_id={post.id} comments={comments}/>
    </React.Fragment>
  );
}

export default PostShow;
