// Reducer fonction
const initialState = {
    isAuthenticated:false,
    userName:"",
    contact:"",
    socket:null,
    contactEmail:"",
    discussions:{
        "name1@name.na":{
            messages:[
                {
                    sender:"him",
                    content:"hello world",
                    date:1222222222222,
                    status:"sent"
                },
            ],
            messageInputContent:"",
        },
        "name2@name.na":{
            messages:[
                {
                    sender:"him",
                    content:"hello world 222",
                    date:1222222232222,
                    status:"sent"
                },
            ],
            messageInputContent:"",
        },
    },

} // initial state

const SET_SOCKET = "setSocket"
const SET_AUTH_STATE = "setState"
const SET_EMAIL = "setEmail"
const SET_USERNAME = "setUsername"
const SET_SELECTED_CONTACT = "setSelectedContact"
const SET_INPUT_MESSAGE_PER_DISCUSSION = "setMessagePerDiscussion";
const ADD_MESSAGE = "addMessage";

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

        case SET_INPUT_MESSAGE_PER_DISCUSSION:
            {
                let contactData = {...state.discussions[state.contactEmail]};
                contactData.messageInputContent = action.value;
                let newDiscussion = {...state.discussions};
                newDiscussion[state.contactEmail] = contactData;
                return {...state, discussions:newDiscussion};
            }

        case ADD_MESSAGE:
            {

                let contactData = {...state.discussions[state.contactEmail]};
                let newMessage = [...contactData.messages];
                for (let i = 0; i < action.value.length; i++) {
                    newMessage.push(action.value[i]);
                }
                contactData.messages = newMessage;
                let newDiscussion = {...state.discussions};
                newDiscussion[state.contactEmail] = contactData;
                return {...state, discussions:newDiscussion};
            }
                
        default:
            return state;
    }
}

export default chatAppReducer;