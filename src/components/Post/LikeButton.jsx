import React, { useState } from "react";
import IconButton from "../shared/IconButton";
import { likeService } from "../../_services/like_service";
import { authenticationHelper } from "../../_helpers/auth_helpers";

function LikeButton(props) {


  return (
    <React.Fragment>
      <IconButton type="like" text={props.likes} onClick={props.handleLike} />
    </React.Fragment>
  );
}

export default LikeButton;
