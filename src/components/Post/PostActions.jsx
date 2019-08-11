import React, { useState, useContext } from "react";
import IconButton from "components/shared/IconButton";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import { likeService } from "_services/like_service";
import { authenticationHelper } from "_helpers/auth_helpers";
import { AuthContext } from "_helpers/auth_context";
import ErrorMessage from "components/shared/ErrorMessage"

function PostActions(post) {
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);
  const context = useContext(AuthContext);

  function handleLike(post_id, type) {
    if (context.isAuth) {
      likeService
        .create(post_id, type)
        .then(response => {
          console.log(response);
          authenticationHelper.handleTokenChange(response);
          setLikes(response.data.likes);
          setDislikes(response.data.dislikes);
        })
        .catch(error => {
          console.log(error.response);
          authenticationHelper.handleTokenChange(error.response);
        });
    } else {
      ErrorMessage("Please log in to vote");
    }
  }

  return [
    <LikeButton likes={likes} handleLike={() => handleLike(post.id, 0)} />,
    <DislikeButton
      dislikes={dislikes}
      handleLike={() => handleLike(post.id, 1)}
    />,
    <IconButton type="message" text={post.comment_count} />
  ];
}

export default PostActions;
