import React, {useContext} from "react";
import CommentForm from "./CommentForm";
import { List } from "antd";
import CommentShow from "./CommentShow";
import { AuthContext } from "_helpers/auth_context";

function CommentComponent(props) {
  const { post_id, comments } = props;
  const context = useContext(AuthContext);

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
      {context.isAuth ? <CommentForm post_id={post_id} /> : null}
    </React.Fragment>
  );
}

export default CommentComponent;
