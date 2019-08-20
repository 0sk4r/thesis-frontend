import { authenticationHelper } from "_helpers/auth_helpers";
const axios = require("axios");

const apiWithAuth = axios.create({
  baseURL: "/api",
});

apiWithAuth.interceptors.response.use(
  function(response) {
    authenticationHelper.handleTokenChange(response);
    return response;
  },
  function(error) {
    authenticationHelper.handleTokenChange(error.response);
    return Promise.reject(error);
  }
);
const api = axios.create({
  baseURL: "/api"
});

export { apiWithAuth, api };
