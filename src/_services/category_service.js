import { api } from "_helpers/api";

// Set of functions that interact with category api
export const categoryService = {
  index,
  show
};

// Get all category
function index() {
  return api.get("/categories/");
}

// Get info and post from selected category
function show(id) {
  return api.get(`/categories/${id}`);
}
