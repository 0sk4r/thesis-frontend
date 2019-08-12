const axios = require("axios");

// Set of functions that interact with category api
export const categoryService = {
  index,
  show
};

// Get all category
function index() {
  return axios.get("/api/categories/");
}

// Get info and post from selected category
function show(id) {
  return axios.get(`/api/categories/${id}`);
}
