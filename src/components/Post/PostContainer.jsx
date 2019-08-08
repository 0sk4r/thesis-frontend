import React from "react";
import { List, Avatar} from "antd";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import PostActions from "./PostActions";


function PostContainer(props) {
  const { post } = props;
  return (
    <List.Item
      key={post.id}
      actions={PostActions(post)}
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
      <ReactMarkdown source={post.content}/>
    </List.Item>
  );
}

export default PostContainer;
