import React, { useContext, useState } from "react";
import IconButton from "../shared/Buttons/IconButton";
import LikeButton from "../shared/Buttons/LikeButton";
import DislikeButton from "../shared/Buttons/DislikeButton";
import EditButton from "components/shared/Buttons/EditButton";
import { likeService } from "_services/like_service";
import { AuthContext } from "_helpers/auth_context";
import ErrorMessage from "components/shared/ErrorMessage";

// Component displaying additional info about post (likes,dislikes, comment count) and button for like action and edit
function PostActions(post) {
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);
  const context = useContext(AuthContext);

  // Create like in backend when button pressed. Like type 0: positive. Like type 1: negative.
  function handleLike(post_id, type) {
    // Check if user is logged
    if (context.isAuth) {
      likeService.create(post_id, type).then(response => {
        setLikes(response.data.likes);
        setDislikes(response.data.dislikes);
      });
    } else {
      // if user is not logged display error message
      ErrorMessage("Please log in to vote");
    }
  }

  return [
    <LikeButton likes={likes} handleLike={() => handleLike(post.id, 0)} />,
    <DislikeButton
      dislikes={dislikes}
      handleLike={() => handleLike(post.id, 1)}
    />,
    <IconButton type="message" text={post.comment_count} />,
    <EditButton post={post} />
  ];
}

export default PostActions;
