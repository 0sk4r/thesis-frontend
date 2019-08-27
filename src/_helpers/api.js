import { authenticationHelper } from "_helpers/auth_helpers";

const axios = require("axios");

const apiWithAuth = axios.create({
  baseURL: "/api"
});

// Intercept requests and add auth headers
apiWithAuth.interceptors.request.use(
  function(config) {
    config.headers = authenticationHelper.getHeaders();

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
// Intercept authenticated response from api and handle token change
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
