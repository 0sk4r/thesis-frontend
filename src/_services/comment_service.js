import {authenticationHelper} from "../_helpers/auth_helpers";
import {apiWithAuth} from "_helpers/api"

// Service interact with comment api
export const commentService = {
  create,
};

// Create new comment
function create(post_id, content) {
  let data = new FormData();
  data.append("post_id", post_id);
  data.append("content", content);

  return apiWithAuth
    .post(
      "/comments/",
      data,
      {
        // Add authentication headers to request
        headers: authenticationHelper.getHeaders()
      }
    )
}