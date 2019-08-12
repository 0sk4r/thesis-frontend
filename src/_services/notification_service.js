import { authenticationHelper } from "../_helpers/auth_helpers";
const axios = require("axios");

// Service interact with notification api
export const notificationService = {
  index,
  destroy,
  delete_all
};
// Get notifications for user
function index() {
  return axios.get("/api/notifications/", {
    headers: authenticationHelper.getHeaders()
  });
}
// Destroy notification with id
function destroy(id) {
  return axios.delete(`/api/notifications/${id}`, {
    headers: authenticationHelper.getHeaders()
  });
}

// Destroy all user notification
function delete_all() {
  return axios.delete(`/api/notifications/delete_all`, {
    headers: authenticationHelper.getHeaders()
  });
}
