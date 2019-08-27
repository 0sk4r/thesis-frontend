import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Icon, Button, Input, AutoComplete } from "antd";
import { postService } from "_services/post_service";
const { Option } = AutoComplete;

function renderOption(item) {
  return (
    <Option key={item.id} text={item.title}>
      <Link to={`/posts/${item.id}`}>{item.title}</Link>
    </Option>
  );
}

// Search component. It search posts by title
function SearchComponent(props) {
  const [posts, setPosts] = useState([]);

  // redirect to post on select
  function onSelect(postId) {
    props.history.push(`/posts/${postId}`);
  }

  // search for posts by key
  function searchResult(key) {
    postService
      .search(key)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => console.log(error.response));
  }

  return (
    <AutoComplete
      size="large"
      style={{ width: 300 }}
      dataSource={posts.map(renderOption)}
      onSearch={searchResult}
      onSelect={onSelect}
      placeholder="input here"
      optionLabelProp="text"
    >
      <Input
        suffix={
          <Button
            className="search-btn"
            style={{ marginRight: -12 }}
            size="large"
            type="primary"
          >
            <Icon type="search" />
          </Button>
        }
      />
    </AutoComplete>
  );
}

export default withRouter(SearchComponent);
