import React from "react";
import CommentForm from "./CommentForm";
import { List } from "antd";
import CommentShow from "./CommentShow";

function CommentComponent(props) {
  const { post_id, comments } = props;
  return (
    <React.Fragment>
      <List
        className="comment-list"
        header={`${comments.length} replies`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={comment => (
          <li>
            <CommentShow comment={comment} />
          </li>
        )}
      />

      <CommentForm post_id={post_id} />
    </React.Fragment>
  );
}

export default CommentComponent;
