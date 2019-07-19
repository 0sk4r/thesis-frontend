import { authenticationHelper } from "../_helpers/auth_helpers";
const axios = require("axios");

export const notificationService = {
  index,
  destroy,
  delete_all
};

function index() {
  return axios.get("/api/notifications/", {
    headers: authenticationHelper.getHeaders()
  });
}

function destroy(id) {
  return axios.delete(`/api/notifications/${id}`, {
    headers: authenticationHelper.getHeaders()
  });
}

function delete_all() {
  return axios.delete(`/api/notifications/delete_all`, {
    headers: authenticationHelper.getHeaders()
  });
}
