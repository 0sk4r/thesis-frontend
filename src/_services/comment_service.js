import { authenticationHelper } from "../_helpers/auth_helpers";
const axios = require("axios");

// Service interact with comment api
export const commentService = {
  create,
};

// Create new comment
function create(post_id, content) {
  let data = new FormData();
  data.append("post_id", post_id);
  data.append("content", content);

  return axios
    .post(
      "/api/comments/",
      data,
      {
        // Add authentication headers to request
        headers: authenticationHelper.getHeaders()
      }
    )
}