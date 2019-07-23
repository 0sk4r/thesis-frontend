import React from "react";
import { List, Avatar, Icon } from "antd";
import { Link } from "react-router-dom";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

function PostContainer(props) {
  const { post } = props;
  return (
    <List.Item
      key={post.id}
      actions={[
        <IconText type="like" text={post.likes} />,
        <IconText type="dislike" text={post.dislikes} />,
        <IconText type="message" text={post.comment_count} />
      ]}
      extra={<img width={272} alt="logo" src={post.image.url} />}
    >
      <List.Item.Meta
        avatar={<Avatar src={post.user.image.url} />}
        title={
          <Link to={"/posts/" + post.id}>
            <p>{post.title} / {post.category.name}</p>
          </Link>
        }
        description={<p>by {post.user.name}</p>}
      />
      {post.content}
    </List.Item>
  );
}

export default PostContainer;
