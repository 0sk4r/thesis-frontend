import React, {useContext} from "react";
import CommentForm from "./CommentForm";
import {List} from "antd";
import CommentShow from "./CommentShow";
import {AuthContext} from "_helpers/auth_context";

// Show comment list and comment form for post
function CommentComponent(props) {
  const {post_id, comments, setComments} = props;
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
            {/* Display comment list */}
            <CommentShow comment={comment}/>
          </li>
        )}
      />
      {/* Display form only if user is logged */}
      {context.isAuth ? <CommentForm post_id={post_id} setComments={setComments}/> : null}
    </React.Fragment>
  );
}

export default CommentComponent;
