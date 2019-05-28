import React, { useState } from "react";
import IconButton from "../shared/IconButton";
import { likeService } from "../../_services/like_service";
import { authenticationHelper } from "../../_helpers/auth_helpers";

function LikeButton({ post }) {
  const [likes, setLikes] = useState(post.likes);

  function handleLike() {
    likeService
      .create(post.id, 0)
      .then(response => {
        console.log(response);
        authenticationHelper.handleTokenChange(response);
        setLikes(response.data.likes)
      })
      .catch(error => {
        console.log(error.response);
        authenticationHelper.handleTokenChange(error.response);
      });
  }

  return (
    <React.Fragment>
      <IconButton type="like" text={likes} onClick={handleLike} />
    </React.Fragment>
  );
}

export default LikeButton;
