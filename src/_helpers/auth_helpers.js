// Set of fuctnions helping with authentication
export const authenticationHelper = {
  handleTokenChange,
  getHeaders
};

// Return set of headers needed for authentication
function getHeaders() {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    "token-type": "Bearer",
    "uid": user.uid,
    "expiry": user.expiry,
    "client": user.client,
    "access-token": user.access_token
  }
}

// Handling token change after requests
function handleTokenChange(response) {
  const access_token = response.headers["access-token"];
  const expiry = response.headers["expiry"];
  if (access_token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.access_token = access_token;
    user.expiry = expiry;
    localStorage.setItem("user", JSON.stringify(user));
  }
}