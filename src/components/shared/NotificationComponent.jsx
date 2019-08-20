import React, {useEffect, useState} from "react";
import {Badge, Button, Dropdown, Icon, Menu} from "antd";
import {notificationService} from "_services/notification_service";
import MentionNotification from "../Notifications/MentionNotification";

// Component displaying dropdown with user notification list
function NotificationComponent() {
  // count of all notification. Dissplaying on badge
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  // fetch data
  useEffect(() => {
    notificationService
      .index()
      .then(response => {
        setCount(response.data.length);
        setNotifications(response.data);
      })
      .catch(error => {
      });
  }, []);

  // Function handle delete of single notification
  function handleDeleteNotification(id) {
    notificationService
      .destroy(id)
      .then(response => {
        setNotifications(response.data);
        setCount(response.data.length);
      })
      .catch(error => {
      });
  }

  // Handle delete of all notification
  function handleDeleteAll() {
    notificationService
      .delete_all()
      .then(response => {
        setNotifications(response.data);
        setCount(response.data.length);
      })
      .catch(error => {
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
      <Menu.Item key="dlkajslkjdlka">
        <Button
          type="danger"
          shape="round"
          icon="delete"
          onClick={() => handleDeleteAll()}
        >
          Delete all!
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Badge count={count}>
        <Icon type="bell"/>
      </Badge>
    </Dropdown>
  );
}

export default NotificationComponent;
