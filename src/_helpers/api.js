import { authenticationHelper } from "../_helpers/auth_helpers";
const axios = require("axios");

const apiWithAuth = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: authenticationHelper.getHeaders()
});

const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

export { apiWithAuth, api}