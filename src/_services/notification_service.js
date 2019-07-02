import { authenticationHelper } from "../_helpers/auth_helpers";
const axios = require("axios");

export const notificationService = {
  index,
};

function index() {

  return axios
    .get(
      "/api/notifications/",
      {
        headers: authenticationHelper.getHeaders()
      }
    )
}