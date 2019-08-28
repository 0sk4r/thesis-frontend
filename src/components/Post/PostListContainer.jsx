import React from "react";
import PostContainer from "./PostContainer";
import { List, Alert } from "antd";

// Container for displaying list of posts
function PostListContainer({ posts, isLoading, errors }) {
  // When there is an error display message otherwise display post list
  return errors ? (
    // Display error
    <div>
      <Alert message="Error" description={errors} type="error" showIcon />
    </div>
  ) : (
    <List itemLayout="vertical" size="large" loading={isLoading}>
      {posts.map(post => (
        // map each single post to container
        <PostContainer post={post} key={post.id} shorten={true}/>
      ))}
    </List>
  );
}

export default PostListContainer;
