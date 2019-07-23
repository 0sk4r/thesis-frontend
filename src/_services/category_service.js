const axios = require("axios");

export const categoryService = {
  index
};

function index() {
  return axios.get("/api/categories/");
}
