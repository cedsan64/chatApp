// import logo from './logo.svg';
import './chat.css';
import React from 'react'
import Message from "./message"
// import Header from "./header"
import DiscussionContact from "./discussonContact"

class Chat extends React.Component {
  constructor(props){
    super(props)
    this.state = {selectedContact:""}
    this.setSelectedContact = this.setSelectedContact.bind(this);
   
}
  


    setSelectedContact(contact) {
        this.setState({selectedContact: contact})
    }

  render(){
      // console.log(this.state.selectedContact)
    const appStyle={display:'flex', height:'100%',flexDirection:'column',justifyContent:"center", alignItems:'center'}
    const mainContainerStyle={width:"1240px", borderRadius:"5px", minWidth:"1080px", height:"750px",boxShadow: "rgb(177 177 177) -3px -1px 20px 0px", border:"solid 0px #ddd",display:"flex"}
    
    return (
        
      <div className="App" style={appStyle}>
        <div id="mainContainer" style={mainContainerStyle}>
          
        <DiscussionContact setSelectedContact={this.setSelectedContact} selectedContact={this.state.selectedContact} />
          
        <Message selectedContact={this.state.selectedContact}/>
        
        </div>
      </div>
  );
  }
}
export default Chat;
