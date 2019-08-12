import React from "react";
import PostContainer from "./PostContainer";
import { List, Alert } from "antd";

function PostListContainer({ posts, isLoading, errors }) {
  return errors ? (
    <div>
      <Alert message="Error" description={errors} type="error" showIcon />
    </div>
  ) : (
    <List itemLayout="vertical" size="large" loading={isLoading}>
      {posts.map(post => (
        <PostContainer post={post} key={post.id} />
      ))}
    </List>
  );
}

export default PostListContainer;
