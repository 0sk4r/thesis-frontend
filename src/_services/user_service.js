import { authenticationHelper } from "../_helpers/auth_helpers";

const axios = require("axios");

export const userService = {
  find,
  edit,
  update
};

function find(key) {
  return axios.get("/api/users/find/", { params: { key: key } });
}

function edit() {
  return axios.get("/api/users/edit/", {
    headers: authenticationHelper.getHeaders()
  });
}
function update(name, nickname, image) {
  console.log(`${name},${nickname}`)
  let data = new FormData();
  data.append("nickname", nickname);
  data.append("name", name);
  data.append("image", image);

  return axios.patch("/api/users/edit", data, {
    headers: authenticationHelper.getHeaders()
  });
}
