import React from "react";
import IconButton from "./IconButton";

// Button for dislike action
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
