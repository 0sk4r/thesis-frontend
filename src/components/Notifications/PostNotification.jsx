import React from "react";
import { Button, Col, Menu, Row } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

// Component displaying mention notification
function PostNotification(props) {
  // COMMENT_LENGTH decide how long comment quote will be in notification
  const notification = props.notification;
  const post = notification.action;
  const postAuthor = post.user;

  const style = {
    margin: "10px"
  };

  return (
    <Menu.Item {...props} style={style}>
      <Row>
        <Col span={20}>
          <Link to={`/posts/${post.id}=`}>
            {postAuthor.name} created new post
          </Link>
        </Col>

        <Col span={4}>
          <Button
            type="danger"
            shape="circle"
            icon="delete"
            onClick={() => props.handleDeleteNotification(notification.id)}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <small>{moment(notification.created_at).fromNow()}</small>
        </Col>
      </Row>
    </Menu.Item>
  );
}

export default PostNotification;
