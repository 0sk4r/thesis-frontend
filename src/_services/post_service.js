import { authenticationHelper } from "../_helpers/auth_helpers";
const axios = require("axios");

export const postService = {
  create,
  get
};

function create(title, content) {
  return axios
    .post(
      "/api/posts/",
      { title: title, content: content },
      {
        headers: authenticationHelper.getHeaders()
      }
    )
  // return axios({
  //   method: "post",
  //   url: "http://localhost:3000/api/posts/",
  //   headers: authenticationHelper.getHeaders(),
  //   data: {
  //       title: title,
  //       content: content
  //   }
  // }).then(response => authenticationHelper.handleTokenChange(response));

  //return Api2.post('/posts/', {title: title, content:content}).then(response => authenticationHelper.handleTokenChange(response));
}

function get() {}
