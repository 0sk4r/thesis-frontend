import React from "react";
import { Avatar, List } from "antd";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import PostActions from "./PostActions";
import moment from "moment";

// Component responsible for displaying single post
function PostContainer(props) {
  const { post, shorten } = props;
  let content = post.content;

  // Shorten content depending on value from props
  // used on main page
  if (shorten) {
    content = content.substring(0, 1000);
  }
  return (
    <List.Item
      key={post.id}
      // display button for like, dislike etc.
      actions={PostActions(post)}
      extra={<img width={272} alt="logo" src={post.image.url} />}
    >
      <List.Item.Meta
        // display user avatar
        avatar={<Avatar src={post.user.image.url} />}
        title={
          <Link to={"/posts/" + post.id}>
            <p>
              {post.title} / {post.category.name}
            </p>
          </Link>
        }
        description={
          <p>
            by <Link to={`/users/${post.user.id}`}>{post.user.name}</Link>{" "}
            {moment(post.created_at).fromNow()}
          </p>
        }
      />
      {/* Render markdown */}
      <ReactMarkdown source={content} />
    </List.Item>
  );
}

export default PostContainer;
