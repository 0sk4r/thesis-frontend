import { api, apiWithAuth } from "_helpers/api";

// Service interact with user api

export const userService = {
  find,
  edit,
  update,
  getInfo,
  show,
  follow
};

// Find users that nickname fit to key
function find(key) {
  return api.get("/users/find/", { params: { key: key } });
}

// Get info for user edit form
function edit() {
  return apiWithAuth.get("/users/edit/");
}

// Update user data
function update(name, nickname, image) {
  let data = new FormData();
  data.append("nickname", nickname);
  data.append("name", name);
  data.append("image", image);

  return apiWithAuth.patch("/users/edit", data);
}

// get info about logged user
function getInfo() {
  return apiWithAuth.get("/users/getInfo");
}

function show(id, page) {
  return api.get(`/users/${id}/page/${page}`);
}

function follow(id) {
  return apiWithAuth.post("/follows/", { following_id: id });
}
