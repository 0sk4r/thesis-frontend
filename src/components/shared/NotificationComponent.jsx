import React, { useEffect, useState } from "react";
import { Badge, Dropdown, Icon, Menu, Button } from "antd";
import { notificationService } from "../../_services/notification_service";
import { authenticationHelper } from "../../_helpers/auth_helpers";
import MentionNotification from "../Notifications/MentionNotification";

function NotificationComponent(props) {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    notificationService
      .index()
      .then(response => {
        authenticationHelper.handleTokenChange(response);
        setCount(response.data.length);
        setNotifications(response.data);
        console.log(response.data);
      })
      .catch(error => {
        authenticationHelper.handleTokenChange(error.response);
      });
  }, []);

  function handleDeleteNotification(id) {
    notificationService
      .destroy(id)
      .then(response => {
        authenticationHelper.handleTokenChange(response);
        console.log(response.data);
        setNotifications(response.data);
        setCount(response.data.length);
      })
      .catch(error => {
        authenticationHelper.handleTokenChange(error.response);
        console.log(error.response);
      });
  }

  function handleDeleteAll() {
    notificationService
      .delete_all()
      .then(response => {
        authenticationHelper.handleTokenChange(response);
        console.log(response.data);
        setNotifications(response.data);
        setCount(response.data.length);
      })
      .catch(error => {
        authenticationHelper.handleTokenChange(error.response);
        console.log(error.response);
      });
  }

  const menu = (
    <Menu>
      {notifications.map(notification => (
        <MentionNotification
          notification={notification}
          handleDeleteNotification={handleDeleteNotification}
        />
      ))}
      <Menu.Item>
        <Button type="danger" shape="round" icon="delete" onClick={() => handleDeleteAll()}>
          Delete all!
        </Button>
      </Menu.Item>
    </Menu>
  );
  console.log(notifications);
  return (
    <Dropdown overlay={menu}>
      <Badge count={count}>
        <Icon type="bell" />
      </Badge>
    </Dropdown>
  );
}

export default NotificationComponent;
