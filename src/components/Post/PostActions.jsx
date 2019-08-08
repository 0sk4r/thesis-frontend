import React from "react";
import IconButton from "../shared/IconButton";
import LikeButton from "./LikeButton"
import DislikeButton from "./DislikeButton"

function PostActions(post) {

  return ([
      <LikeButton post={post} />,
      <DislikeButton post={post} />,
      <IconButton type="message" text={post.comment_count} />]
  );
}

export default PostActions;
