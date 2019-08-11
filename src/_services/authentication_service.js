const axios = require("axios");

export const authenticationService = {
  login,
  logout,
  signin,
  validate
};

function login(email, password) {
  return axios
    .post("/auth/sign_in", {
      email: email,
      password: password
    })
    .then(function(response) {
      const headers = response.headers;

      const access_token = headers["access-token"];
      const client = headers["client"];
      const expiry = headers["expiry"];
      const uid = headers["uid"];

      const user = JSON.stringify({
        access_token: access_token,
        client: client,
        expiry: expiry,
        uid: uid
      });
      localStorage.setItem("user", user);

      return user;
    });
}

function signin(email, nick, name, password, password_confirmation, image) {
  let data = new FormData();
  data.append('email', email);
  data.append('nickname', nick);
  data.append('name', name);
  data.append('password', password);
  data.append('password_confirmation', password_confirmation);
  data.append('confirm_success_url', "http://localhost:3001/");
  data.append('image', image);

  return axios.post("/auth/", data);
}

function logout() {
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));

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
      .then(response => handleTokenChange(response));
  }

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
}
