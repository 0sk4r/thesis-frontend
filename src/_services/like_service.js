import { authenticationHelper } from "../_helpers/auth_helpers";
const axios = require("axios");

// Service interact with like api
export const likeService = {
  create
};

// Create new like
function create(post_id, like_type) {
  const data = { post_id: post_id, like_type: like_type };
  return axios.post("/api/likes/", data, {
    // add auth headers for request
    headers: authenticationHelper.getHeaders()
  });
}
