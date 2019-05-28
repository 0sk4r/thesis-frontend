import React, { useState } from "react";
import IconButton from "../shared/IconButton";
import { likeService } from "../../_services/like_service";
import { authenticationHelper } from "../../_helpers/auth_helpers";

function DislikeButton({ post }) {
  const [dislikes, setDislikes] = useState(post.dislikes);

  function handleDislike() {
    likeService
      .create(post.id, 1)
      .then(response => {
        console.log(response);
        authenticationHelper.handleTokenChange(response);
        setDislikes(response.data.dislikes)
      })
      .catch(error => {
        console.log(error.response);
        authenticationHelper.handleTokenChange(error.response);
      });
  }

  return (
    <React.Fragment>
      <IconButton type="dislike" text={dislikes} onClick={handleDislike} />
    </React.Fragment>
  );
}

export default DislikeButton;
