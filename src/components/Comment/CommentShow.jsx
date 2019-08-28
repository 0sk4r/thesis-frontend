import React from "react";
import { Comment } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

// Componetn display single comment. Receive data in props
function CommentShow(props) {
  const { comment } = props;

  return (
    <Comment
      id={comment.id}
      author={
        <Link to={`/users/${comment.user.id}`}>{comment.user.nickname}</Link>
      }
      avatar={comment.user.image.url}
      content={comment.content}
      datetime={moment(comment.created_at).fromNow()}
    />
  );
}

export default CommentShow;
