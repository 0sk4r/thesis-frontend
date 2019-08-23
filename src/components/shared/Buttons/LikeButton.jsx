import React from "react";
import IconButton from "./IconButton";

// Button for like
function LikeButton(props) {
  return (
    <React.Fragment>
      <IconButton type="like" text={props.likes} onClick={props.handleLike}/>
    </React.Fragment>
  );
}

export default LikeButton;
