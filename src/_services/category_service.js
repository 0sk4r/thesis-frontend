const axios = require("axios");

export const categoryService = {
  index,
  show
};

function index() {
  return axios.get("/api/categories/");
}

function show(id) {
  return axios.get(`/api/categories/${id}`);
}
