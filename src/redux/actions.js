// action functions for global state changing

const SET_AUTH_STATE = "setState"
const SET_USERNAME = "setUsername"

exports.changeAuth = function(authState) {
   return  {type: SET_AUTH_STATE, value : authState }
}

exports.changeUsername = function(username) {
   return  {type: SET_USERNAME, value : username }
}