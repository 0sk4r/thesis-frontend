import { authenticationHelper } from "../_helpers/auth_helpers";
const axios = require("axios");

export const likeService = {
  create
};

function create(post_id, like_type) {
  const data = { post_id: post_id, like_type: like_type };
  return axios.post("/api/likes/", data, {
    headers: authenticationHelper.getHeaders()
  });
}
