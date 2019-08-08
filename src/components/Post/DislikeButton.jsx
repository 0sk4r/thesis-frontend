import React, { useState } from "react";
import IconButton from "../shared/IconButton";
import { likeService } from "../../_services/like_service";
import { authenticationHelper } from "../../_helpers/auth_helpers";

function DislikeButton(props) {

  return (
    <React.Fragment>
      <IconButton type="dislike" text={props.dislikes} onClick={props.handleLike}/>
    </React.Fragment>
  );
}

export default DislikeButton;
