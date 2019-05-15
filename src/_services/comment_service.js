import { authenticationHelper } from "../_helpers/auth_helpers";
const axios = require("axios");

export const commentService = {
  create,
};

function create(post_id, content) {
  let data = new FormData();
  data.append("post_id", post_id);
  data.append("content", content);

  return axios
    .post(
      "/api/comments/",
      data,
      {
        headers: authenticationHelper.getHeaders()
      }
    )
}