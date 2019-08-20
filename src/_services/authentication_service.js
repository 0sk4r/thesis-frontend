import {authenticationHelper} from "../_helpers/auth_helpers";

const axios = require("axios");

// Authentication actions
export const authenticationService = {
  login,
  logout,
  signin,
  validate
};

// Login user in backend
function login(email, password) {
  // Post email and password
  return axios
    .post("/auth/sign_in", {
      email: email,
      password: password
    })
    .then(function (response) {
      // return in response headers access_token, client, expiry, uid needed for authenticate requests
      const headers = response.headers;

      // Separate data from headers
      const access_token = headers["access-token"];
      const client = headers["client"];
      const expiry = headers["expiry"];
      const uid = headers["uid"];

      const user = {
        access_token: access_token,
        client: client,
        expiry: expiry,
        uid: uid,
        id: response.data.data.id
      };
      // store them in local storage
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

// Create new account
function signin(email, nick, name, password, password_confirmation, image) {
  // Post form data to signin endpoint
  let data = new FormData();
  data.append("email", email);
  data.append("nickname", nick);
  data.append("name", name);
  data.append("password", password);
  data.append("password_confirmation", password_confirmation);
  // After email confirmation user will be redirected to this url
  data.append("confirm_success_url", "http://localhost:3001/");
  data.append("image", image);

  return axios.post("/auth/", data);
}

// Logout user
function logout() {
  // Get data from localstorage
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));

    // Delete request with token
    return axios.delete("/auth/sign_out", {
      headers: {
        uid: user.uid,
        client: user.client,
        "access-token": user.access_token,
        expiry: user.expiry,
        "token-type": "Bearer"
      }
    });
  }
}

// Validate token store in localstorage is valid
function validate() {
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));

    return axios
      .get("/auth/validate_token", {
        headers: {
          uid: user.uid,
          client: user.client,
          "access-token": user.access_token,
          expiry: user.expiry,
          "token-type": "Bearer"
        }
      })
      .then(response => authenticationHelper.handleTokenChange(response));
  }
}
