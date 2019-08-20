import { authenticationHelper } from "../_helpers/auth_helpers";
import {apiWithAuth, api} from "_helpers/api"

// Service interact with post api
export const postService = {
  create,
  edit,
  getAll,
  get,
  update
};

// create new post
function create(title, content,file, category) {
  // Create FormData that represents form fields
  let data = new FormData();
  data.append("title", title);
  data.append("content", content);
  data.append("image", file);
  data.append("category_id", category)
  
  return apiWithAuth
    .post(
      "/posts/",
      data,
      {
        headers: authenticationHelper.getHeaders()
      }
    )
}

// Get info to post edit form
function edit(id){
  return apiWithAuth.get(`/posts/${id}/edit`, {
    headers: authenticationHelper.getHeaders()
  })
}

// Update post data
function update(title, content,file, category, postId) {
  console.log(file)
  let data = new FormData();
  data.append("title", title);
  data.append("content", content);
  data.append("image", file);
  data.append("category_id", category)
  
  return apiWithAuth
    .put(
      `/posts/${postId}`,
      data,
      {
        headers: authenticationHelper.getHeaders()
      }
    )
}

// Get all posts with pagination. Page params decide which page get
function getAll(page) {
  return api.get(`/posts/page/${page}`)
}

// Get data for single post
function get(id){
  return api.get(`/posts/${id}`)
}