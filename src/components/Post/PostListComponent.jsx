import React, {useEffect, useState} from "react";
import {Pagination} from "antd";
import {postService} from "_services/post_service";
import PostListContainer from "./PostListContainer";

// Component responsible for present list of all posts
function PostListComponent() {
  const [posts, setPosts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  // Default page in pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  // Fetch post list from backend with pagination. Refetch data when page change
  useEffect(() => {
    setIsLoading(true);
    postService
      .getAll(page)
      .then(response => {
        setIsLoading(false);
        setPosts(response.data.posts);
        setTotalItems(response.data.meta.total);
        setPerPage(response.data.meta.per_page);
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response) {
          let error_messages = "";
          if (error.response.status === 500) {
            error_messages = "Backend not responding";
          } else {
            error_messages = error.response.data.errors.full_messages;
          }
          setErrors(error_messages);
        } else if (error.request) {
          setErrors("Something went wrong. Try again later.");
        }
      });
  }, [page]);

  // Handle page change
  function onChange(page) {
    setPage(page);
  }

  return (
    <React.Fragment>
      <PostListContainer posts={posts} isLoading={isLoading} errors={errors}/>
      <Pagination total={totalItems} pageSize={perPage} onChange={onChange}/>
    </React.Fragment>
  );
}

export default PostListComponent;
