import {api, apiWithAuth} from "_helpers/api"

// Service interact with post api
export const postService = {
  create,
  edit,
  getAll,
  get,
  update,
  search
};

// create new post
function create(title, content, file, category) {
  // Create FormData that represents form fields
  let data = new FormData();
  data.append("title", title);
  data.append("content", content);
  data.append("image", file);
  data.append("category_id", category);

  return apiWithAuth
    .post(
      "/posts/",
      data
    )
}

// Get info to post edit form
function edit(id) {
  return apiWithAuth.get(`/posts/${id}/edit`)
}

// Update post data
function update(title, content, file, category, postId) {
  let data = new FormData();
  data.append("title", title);
  data.append("content", content);
  data.append("image", file);
  data.append("category_id", category);

  return apiWithAuth
    .put(
      `/posts/${postId}`,
      data
    )
}

// Get all posts with pagination. Page params decide which page get
function getAll(page) {
  return api.get(`/posts/page/${page}`)
}

// Get data for single post
function get(id) {
  return api.get(`/posts/${id}`)
}

function search(key) {
  return api.get(`/search/${key}`);
}