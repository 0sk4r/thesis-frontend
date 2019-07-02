import React, { useState, useEffect } from "react";
import { Badge} from "antd";
import { notificationService } from "../../_services/notification_service";
import { authenticationHelper } from "../../_helpers/auth_helpers";

function NotificationComponent(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    notificationService
      .index()
      .then(response => {
        setCount(response.data.length);
        authenticationHelper.handleTokenChange(response);
      })
      .catch(error => {
        authenticationHelper.handleTokenChange(error.response);
      });
  });

  const style = {
    width: "20px",
    height: "20px",
    border_radius: "4px",
    background: "#eee",
    display: "inline-block",
    vertical_align: "middle"
  };

  return (
    <Badge count={count}>
      <a href="#" style={style} />
    </Badge>
  );
}

export default NotificationComponent;
