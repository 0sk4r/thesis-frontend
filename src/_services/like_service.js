import { apiWithAuth } from "_helpers/api";

// Service interact with like api
export const likeService = {
  create
};

// Create new like
function create(post_id, like_type) {
  const data = { post_id: post_id, like_type: like_type };
  return apiWithAuth.post("/likes/", data);
}
