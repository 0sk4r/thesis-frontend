import { authenticationHelper } from "../_helpers/auth_helpers";
const axios = require("axios");

const apiWithAuth = axios.create({
  baseURL: "/api",
  headers: authenticationHelper.getHeaders()
});

const api = axios.create({
  baseURL: "/api"
});

export { apiWithAuth, api}