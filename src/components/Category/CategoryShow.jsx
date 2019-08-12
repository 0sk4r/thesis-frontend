import React, { useState, useEffect } from "react";
import { categoryService } from "_services/category_service";
import PostListContainer from "components/Post/PostListContainer";

// Display all post from selected category.
function CategoryShow(props) {
  const { match } = props;
  const [posts, setPosts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  // Fetch data from backend
  useEffect(() => {
    setIsLoading(true);
    categoryService
      .show(match.params.id)
      .then(response => {
        setIsLoading(false);
        setPosts(response.data.posts);
        setCategoryName(response.data.name);
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
  }, [match.params.id]);

  return (
    <React.Fragment>
      <h1>{"Post from category " + categoryName}</h1>
      <PostListContainer posts={posts} isLoading={isLoading} errors={errors} />
    </React.Fragment>
  );
}

export default CategoryShow;
