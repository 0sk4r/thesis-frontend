import React from 'react'
import {Menu, Row, Col, Button} from "antd";
import {Link} from "react-router-dom";

function MentionNotification(props) {
  const COMMENT_LENGTH = 4;
  const notification = props.notification;
  const comment = notification.action.comment;
  const commentAuthor = comment.user;
  const commentContent = comment.content;

  const style = {
    margin: '10px'
  };

  return (
    <Menu.Item {...props} style={style}>
      <Row>
        <Col span={20}>
          <Link to={`/posts/${comment.post.id}#${comment.id}`}>
            {commentAuthor.name} mentioned you in comment "{commentContent.substring(0, COMMENT_LENGTH)}"
          </Link>
        </Col>

        <Col span={4}>
          <Button type="danger" shape="circle" icon="delete" onClick={() => props.handleDeleteNotification(notification.id)} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <small>
            {notification.created_at}
          </small>
        </Col>
      </Row>
    </Menu.Item>
  )
}

export default MentionNotification;