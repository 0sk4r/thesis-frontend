import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import PostListContainer from "../Post/PostListContainer";
import { userService } from "_services/user_service";
import UserInfo from "./UserInfo";

// Component responsible for present list of all posts
function UserShow(props) {
  const { match } = props;

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  // Default page in pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState("");

  // Fetch post list from backend with pagination. Refetch data when page change
  useEffect(() => {
    setIsLoading(true);
    userService
      .show(match.params.id, page)
      .then(response => {
        setPosts(response.data.posts);
        setUser(response.data.user);
        setTotalItems(response.data.meta.total);
        setPerPage(response.data.meta.per_page);
        setIsLoading(false);
      })
      .catch(error => {
        if (error.response) {
          let error_messages = "";
          if (error.response.status === 500) {
            error_messages = "Backend not responding";
          } else {
            error_messages = error.response.statusText;
          }
          setErrors(error_messages);
        } else if (error.request) {
          setErrors("Something went wrong. Try again later.");
        }
        setIsLoading(false);
      });
  }, [match.params.id, page]);

  // Handle page change
  function onChange(page) {
    setPage(page);
  }
  return (
    <React.Fragment>
      {!isLoading && !errors ? <UserInfo user={user} /> : null}
      <PostListContainer posts={posts} isLoading={isLoading} errors={errors} />
      <Pagination total={totalItems} pageSize={perPage} onChange={onChange} />
    </React.Fragment>
  );
}

export default UserShow;
