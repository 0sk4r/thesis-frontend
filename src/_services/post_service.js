import { authenticationHelper } from "../_helpers/auth_helpers";
const axios = require("axios");

export const postService = {
  create,
  getAll,
  get
};

function create(title, content,file) {
  let data = new FormData();
  data.append("title", title);
  data.append("content", content);
  data.append("image", file);
  
  return axios
    .post(
      "/api/posts/",
      data,
      {
        headers: authenticationHelper.getHeaders()
      }
    )
}

function getAll() {
  return axios.get("/api/posts/")
}

function get(id){
  return axios.get(`/api/posts/${id}`)
}