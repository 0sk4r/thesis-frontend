import { BehaviorSubject } from "rxjs";
const axios = require("axios");

// import config from 'config';
// import { handleResponse } from '../_helpers/handle_response';

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("user"))
);

export const authenticationService = {
  login,
  logout,
  signin,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

function login(email, password) {
    return axios
    .post("http://localhost:3000/auth/sign_in", {
      email: email,
      password: password
    })
    .then(function(response) {

      console.log(response);
      const headers = response.headers;

      const access_token = headers["access-token"]
      const client = headers["client"]
      const expiry = headers["expiry"]
      const uid = headers["uid"]
      
      localStorage.setItem("user",JSON.stringify({
        "access_token": access_token,
        "client": client,
        "expiry": expiry,
        "uid": uid
      }));
    })
}

function signin(email, nick, name, password, password_confirmation){
  return axios.post("http://localhost:3000/auth/",{
    "email": email,
    "nickname": nick,
    "name": name,
    "password": password,
    "password_confirmation": password_confirmation,
    "confirm_success_url": "http://localhost:3000/"
  })
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
