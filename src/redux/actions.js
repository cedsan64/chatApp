// action functions for global state changing

const SET_AUTH_STATE = "setState";
const SET_EMAIL = "setEmail";
const SET_USERNAME = "setUsername";
const SET_SOCKET = "setSocket";
const SET_SELECTED_CONTACT = "setSelectedContact";
const SET_INPUT_MESSAGE_PER_DISCUSSION = "setMessagePerDiscussion";
const ADD_MESSAGE = "addMessage";



exports.changeAuth = function(authState) {
   return  {type: SET_AUTH_STATE, value : authState }
}

exports.changeUsername = function(username) {
   return  {type: SET_USERNAME, value : username }
}

exports.changeEmail = function(Email) {
   return  {type: SET_EMAIL, value : Email }
}

exports.setSocket = function(SOCKET) {
   return  {type: SET_SOCKET, value : SOCKET }
}

exports.setSelectedContact = function(contact) {
   return  {type: SET_SELECTED_CONTACT, value : contact }
}

exports.setInputMessagePerDiscussion = function(message) {
   return  {type: SET_INPUT_MESSAGE_PER_DISCUSSION, value : message }
}

exports.addMessage = function(messageList) {
   return  {type: ADD_MESSAGE, value : messageList }
}
