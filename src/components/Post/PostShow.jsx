import React, { useState, useEffect } from "react";
import { postService } from "../../_services/post_service";
import { List, Alert, Avatar} from "antd";
import CommentComponent from "../Comment/CommentComponent";
import PostActions from "./PostActions"

function PostShow(props) {
  const { match } = props;
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    setIsLoading(true);

    postService
      .get(match.params.id)
      .then(response => {
        setPost(response.data);
        setUser(response.data.user);
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
  }, []);

  if (isLoading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  if (errors)
    return (
      <div>
        <Alert message="Error" description={errors} type="error" showIcon />
      </div>
    );

  return (
    <React.Fragment>
      <List itemLayout="vertical" size="large" loading={isLoading}>
        <List.Item
          key={post.id}
          actions={PostActions(post)}
          extra={<img width={272} alt="logo" src={post.image.url} />}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.image.url} />}
            title={<p>{post.title} / {post.category.name}</p>}
            description={<p>by {user.name}</p>}
          />
          {post.content}
        </List.Item>
      </List>
      <CommentComponent post_id={post.id} comments={comments} />
    </React.Fragment>
  );
}

export default PostShow;
