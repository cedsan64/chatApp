// Reducer fonction
const initialState = {isAuthenticated:false,userName:"",contact:"",socket:null,contactEmail:""} // initial state

const SET_SOCKET = "setSocket"
const SET_AUTH_STATE = "setState"
const SET_EMAIL = "setEmail"
const SET_USERNAME = "setUsername"
const SET_SELECTED_CONTACT = "setSelectedContact"

 function chatAppReducer(state = initialState,action) {
    switch (action.type) {
        case SET_AUTH_STATE:
            return {...state, isAuthenticated:action.value};    
        case SET_USERNAME:
            return {...state, userName:action.value};
            
        case SET_EMAIL:
            return {...state, contactEmail:action.value};
    
        case SET_SOCKET:
            return {...state, socket:action.value};
                
        case SET_SELECTED_CONTACT:
            return {...state, contact:action.value};
        default:
            return state;
    }
}

export default chatAppReducer;