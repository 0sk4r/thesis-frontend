import React, { useState } from "react";
import { userService } from "_services/user_service";
import { Button } from "antd";
import ErrorMessage from "../ErrorMessage";

// Button for dislike action
function FollowButton(props) {
  const [text, setText] = useState("Follow");
  
  function handleClick() {
    userService
      .follow(props.id)
      .then(response => {
        setText("Following");
      })
      .catch(error => {
        ErrorMessage(error.response.data.errors);
      });
  }

  return (
    <React.Fragment>
      <Button type="primary" onClick={handleClick}>
        {text}
      </Button>
    </React.Fragment>
  );
}

export default FollowButton;
