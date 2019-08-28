import React, { useEffect, useState } from "react";
import { Badge, Button, Dropdown, Icon, Menu } from "antd";
import { notificationService } from "_services/notification_service";
import MentionNotification from "./MentionNotification";
import PostNotification from "./PostNotification";

// Component displaying dropdown with user notification list
function NotificationComponent() {
  // count of all notification. Dissplaying on badge
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  function fetchNotifications() {
    notificationService
      .index()
      .then(response => {
        console.log(response.data);
        setCount(response.data.length);
        setNotifications(response.data);
      })
      .catch(error => {});
  }
  // fetch data
  useEffect(() => {
    fetchNotifications();

    // fetch data every 10s
    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Function handle delete of single notification
  function handleDeleteNotification(id) {
    notificationService
      .destroy(id)
      .then(response => {
        setNotifications(response.data);
        setCount(response.data.length);
      })
      .catch(error => {});
  }

  // Handle delete of all notification
  function handleDeleteAll() {
    notificationService
      .delete_all()
      .then(response => {
        setNotifications(response.data);
        setCount(response.data.length);
      })
      .catch(error => {});
  }

  const menu = (
    <Menu>
      {notifications.map(notification => {
        switch (notification.action_type) {
          case "Mention":
            return (
              <MentionNotification
                notification={notification}
                handleDeleteNotification={handleDeleteNotification}
                key={`notification${notification.id}`}
              />
            );
          case "Post":
            return (
              <PostNotification
                notification={notification}
                handleDeleteNotification={handleDeleteNotification}
                key={`notification${notification.id}`}
              />
            );
          default:
            return null;
        }
      })}
      {/* Button delete all notifications*/}
      <Menu.Item>
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
        <Icon type="bell" />
      </Badge>
    </Dropdown>
  );
}

export default NotificationComponent;
