import { authenticationHelper } from "../_helpers/auth_helpers";
const axios = require("axios");

export const postService = {
  create,
  edit,
  getAll,
  get,
  update
};

function create(title, content,file, category) {
  let data = new FormData();
  data.append("title", title);
  data.append("content", content);
  data.append("image", file);
  data.append("category_id", category)
  
  return axios
    .post(
      "/api/posts/",
      data,
      {
        headers: authenticationHelper.getHeaders()
      }
    )
}

function edit(id){
  return axios.get(`/api/posts/${id}/edit`, {
    headers: authenticationHelper.getHeaders()
  })
}

function update(title, content,file, category, postId) {
  let data = new FormData();
  data.append("title", title);
  data.append("content", content);
  data.append("image", file);
  data.append("category_id", category)
  
  return axios
    .put(
      `/api/posts/${postId}`,
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