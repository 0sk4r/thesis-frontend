import React, { useState } from "react";
import IconButton from "../shared/IconButton";
import { likeService } from "../../_services/like_service";
import { authenticationHelper } from "../../_helpers/auth_helpers";
import LikeButton from "./LikeButton"
import DislikeButton from "./DislikeButton"

function PostActions(post) {

  return ([
      <LikeButton post={post} />,
      <DislikeButton post={post} />,
      <IconButton type="message" text={post.comment_length} />]
  );
}

export default PostActions;
