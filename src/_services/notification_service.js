import { apiWithAuth } from "_helpers/api";

// Service interact with notification api
export const notificationService = {
  index,
  destroy,
  delete_all
};

// Get notifications for user
function index() {
  return apiWithAuth.get("/notifications/");
}

// Destroy notification with id
function destroy(id) {
  return apiWithAuth.delete(`/notifications/${id}`);
}

// Destroy all user notification
function delete_all() {
  return apiWithAuth.delete(`/notifications/delete_all`);
}
