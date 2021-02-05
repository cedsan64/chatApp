// Reducer fonction
const initialState = {isAuthenticated:false,userName:""} // initial state

const SET_AUTH_STATE = "setState"
const SET_USERNAME = "setUsername"

 function chatAppReducer(state = initialState,action) {
    switch (action.type) {
        case SET_AUTH_STATE:
            return {...state, isAuthenticated:action.value};    
        case SET_USERNAME:
            console.log(action.value)
            return {...state, userName:action.value};  
        default:
            return state;
    }
}

export default chatAppReducer;