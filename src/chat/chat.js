// import logo from './logo.svg';
import './chat.css';
import React from 'react'
import Message from "./message"
import {connect} from "react-redux"
import { changeAuth ,setSocket } from '../redux/actions';
// import Header from "./header"
import DiscussionContact from "./discussonContact"
import { io } from 'socket.io-client';

class Chat extends React.Component {
  constructor(props){
    super(props)   
}

  componentWillMount() {
    let token = localStorage.getItem("userToken")
    const socket = io(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/`,{
      auth: {
        token: token
      }
    });
    this.props.dispatch(setSocket(socket));
    // todo : peu etre inserer un temps de chargement avant la recuperation du web socket et tout

    }
  
  render(){

    const appStyle={display:'flex', height:'100%',flexDirection:'column',justifyContent:"center", alignItems:'center'}
    const mainContainerStyle={width:"1240px", borderRadius:"5px", minWidth:"1080px", height:"750px",boxShadow: "rgb(177 177 177) -3px -1px 20px 0px", border:"solid 0px #ddd",display:"flex"}
    
    return (
        
      <div className="App" style={appStyle}>
        <div id="mainContainer" style={mainContainerStyle}>
          
        <DiscussionContact />
          
        <Message />
        
        </div>
      </div>
  );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Chat)
