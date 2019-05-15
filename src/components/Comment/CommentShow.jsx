import React from "react";
import { Comment } from 'antd';

function CommentShow(props){
  const {comment} = props;
return(
  <Comment
          author={comment.user.name}
          avatar={comment.user.image.url}
          content={comment.content}
          datetime={comment.created_at}
        />
)
}

export default CommentShow;