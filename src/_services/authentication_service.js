const axios = require("axios");

export const authenticationService = {
  login,
  logout,
  signin,
  validate
};

function login(email, password) {
  return axios
    .post("http://localhost:3000/auth/sign_in", {
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

function signin(email, nick, name, password, password_confirmation) {
  return axios.post("http://localhost:3000/auth/", {
    email: email,
    nickname: nick,
    name: name,
    password: password,
    password_confirmation: password_confirmation,
    confirm_success_url: "http://localhost:3000/"
  });
}

function logout() {
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));

    return axios.delete("http://localhost:3000/auth/sign_out", {
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
      .get("http://localhost:3000/auth/validate_token", {
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
