import React from "react";
import IconButton from "components/shared/IconButton";

function LikeButton(props) {
  return (
    <React.Fragment>
      <IconButton type="like" text={props.likes} onClick={props.handleLike} />
    </React.Fragment>
  );
}

export default LikeButton;
