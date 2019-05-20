import React, { useState, useEffect } from "react";
import { postService } from "../../_services/post_service";
import { List, Alert, Avatar, Icon } from "antd";
import CommentComponent from "../Comment/CommentComponent";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

function PostShow(props) {
  const { match } = props;
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
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
        setComments(response.data.comment)
        console.log(response.data.comment)
        console.log(comments)
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
      <List itemLayout="vertical" size="large" loading={isLoading}>
      <List.Item
      key={post.id}
      actions={[
        <IconText type="star-o" text="156" />,
        <IconText type="like-o" text="156" />,
        <IconText type="message" text={comments.length} />
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={user.image.url} />}
        title={
            <p>{post.title}</p>
        }
        description={<p>by {user.name}</p>}
      />
      {post.content}
    </List.Item>
      </List>
      {/* <h1>{post.title}</h1>
      <p>by {user.name}</p>
      <p> {post.content} </p> */}
      <CommentComponent post_id={post.id} comments={comments}/>
    </React.Fragment>
  );
}

export default PostShow;
