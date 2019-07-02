const axios = require("axios");

export const userService = {
  find
};

function find(key){
  return axios.get('/api/users/find/',{params: {"key": key}})
}
