import React from "react";
import { Comment } from 'antd';
import moment from "moment";

// Componetn display single comment. Receive data in props
function CommentShow(props){
  const {comment} = props;
return(
  <Comment
          id={comment.id}
          author={comment.user.name}
          avatar={comment.user.image.url}
          content={comment.content}
          datetime={moment(comment.created_at).fromNow()}
        />
)
}

export default CommentShow;