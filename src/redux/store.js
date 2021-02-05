// Reducer store
import {createStore} from "redux"
import chatAppReducer from "./reducer"



const store = createStore(chatAppReducer)

// console.log(store.getState())
store.subscribe(()=> console.log(store.getState()))

export default store;
