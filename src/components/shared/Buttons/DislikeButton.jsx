import React from "react";
import IconButton from "./IconButton";

function DislikeButton(props) {
  return (
    <React.Fragment>
      <IconButton
        type="dislike"
        text={props.dislikes}
        onClick={props.handleLike}
      />
    </React.Fragment>
  );
}

export default DislikeButton;
