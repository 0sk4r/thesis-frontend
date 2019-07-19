import React from "react";
import { Comment } from 'antd';

function CommentShow(props){
  const {comment} = props;
return(
  <Comment
          id={comment.id}
          author={comment.user.name}
          avatar={comment.user.image.url}
          content={comment.content}
          datetime={comment.created_at}
        />
)
}

export default CommentShow;