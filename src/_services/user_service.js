import { authenticationHelper } from "../_helpers/auth_helpers";

const axios = require("axios");

// Service interact with user api

export const userService = {
  find,
  edit,
  update,
  getInfo
};

// Find users that nickname fit to key
function find(key) {
  return axios.get("/api/users/find/", { params: { key: key } });
}

// Get info for user edit form
function edit() {
  return axios.get("/api/users/edit/", {
    headers: authenticationHelper.getHeaders()
  });
}
// Update user data
function update(name, nickname, image) {
  let data = new FormData();
  data.append("nickname", nickname);
  data.append("name", name);
  data.append("image", image);

  return axios.patch("/api/users/edit", data, {
    headers: authenticationHelper.getHeaders()
  });
}
// get info about logged user
function getInfo() {
  return axios.get("/api/users/getInfo", {
    headers: authenticationHelper.getHeaders()
  });
}
