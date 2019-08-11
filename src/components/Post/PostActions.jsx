import React, {useState} from "react";
import IconButton from "components/shared/IconButton";
import LikeButton from "./LikeButton"
import DislikeButton from "./DislikeButton"
import { likeService } from "_services/like_service";
import { authenticationHelper } from "_helpers/auth_helpers";

function PostActions(post) {
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);

  function handleLike(post_id, type) {
    console.log("test")
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
  }

  return ([
      <LikeButton likes={likes} handleLike={() => handleLike(post.id, 0)}/>,
      <DislikeButton dislikes={dislikes}  handleLike={() => handleLike(post.id,1)}/>,
      <IconButton type="message" text={post.comment_count} />]
  );
}

export default PostActions;
