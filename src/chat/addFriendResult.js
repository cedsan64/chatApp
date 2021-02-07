import React from "react";
import {connect} from "react-redux";
import { setSelectedContact } from "../redux/actions"

class AddFriendResult extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {friendShip:this.props.friendShip,status:this.props.status}

    }

    addFriend(user){
        if (user.length === 0) return;
         fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/addfriend?user=${user}`,{
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("userToken")
            },
         })
          .then(res => res.json())
          .then(
            (result) => {
                // console.log(result)
                if (result.status === 200) {   
                    this.setState({
                        friendShip:"sent",
                        status:"pending"
                    })
                }
            },
            // Remarque : il est important de traiter les erreurs ici
            // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
            // des exceptions provenant de réels bugs du composant.
            (error) => {    
              console.log(error)
            }
          )
    }

    confirmFriend(user){
        if (user.length === 0) return;
         fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/acceptfriend?user=${user}`,{
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("userToken")
            },
         })
          .then(res => res.json())
          .then(
            (result) => {
                // console.log(result)
                if (result.status === 200) {   
                    this.setState({
                        status:"friends"
                    })
                }
            },
            // Remarque : il est important de traiter les erreurs ici
            // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
            // des exceptions provenant de réels bugs du composant.
            (error) => {    
              console.log(error)
            }
          )
    }

    removeFriend(user){
        if (user.length === 0) return;
         fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/removefriend?user=${user}`,{
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("userToken")
            },
         })
          .then(res => res.json())
          .then(
            (result) => {
                // console.log(result)
                if (result.status === 200) {   
                    this.setState({friendShip:"other",status:"notfriend"})

                }
            },
            // Remarque : il est important de traiter les erreurs ici
            // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
            // des exceptions provenant de réels bugs du composant.
            (error) => {    
              console.log(error)
            }
          )
    }


    sendMesage(email){
        this.props.toggleVisibility(false);
        this.props.dispatch(setSelectedContact(email));

    }

    renderSwitch(friendShip){
        const btnStyle = {alignSelf:"center",height:"auto",fontSize:"11px",padding:"4px",marginTop:"10px",border:"none"};
        
        if (this.state.status === "friends") {
            return(
                <button onClick={() => this.sendMesage(this.props.name)} className={"btn"} style={{...btnStyle,backgroundColor:"#607d8b"}}>
                Send Message
                <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:5,verticalAlign:"text-bottom"}} width="14" height="14" fill="currentColor" class="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                </svg>
                </button>
        );
        }
        switch (friendShip) {
            case "other":
                return(
                        <button onClick={() => this.addFriend(this.props.email)} className={"btn"} style={{...btnStyle,backgroundColor:"#2196f3"}}>
                        send request
                        <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:5,verticalAlign:"text-bottom"}} width="14" height="14" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                        </button>
                );
        
            case "sent":
                return(
                    <button onClick={() =>this.removeFriend(this.props.email)} className={"btn"} style={{...btnStyle,backgroundColor:"tomato"}}>
                    cancel request
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" style={{marginLeft:5,verticalAlign:"text-bottom"}} fill="currentColor" class="bi bi-person-x-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    </button> 
                );

            case "receive":
                return(
                    <button onClick={() => this.confirmFriend(this.props.email)} className={"btn"} style={{...btnStyle,backgroundColor:"#4caf50"}}>
                    confirm
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" style={{marginLeft:5,verticalAlign:"text-bottom"}}  fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                    </button>
                );
                    
            default:
                break;
        }
    }

    render(){
        const nameStyle={
            // marginBottom:"10px",
            color:"black",
            fontSize:"15px",
            selfAlign:"start",
            fontWeight:"600",
            textTransform:"capitalize"
    
        }
        return (
            <div style={{borderBottom:"solid 1px grey",padding:'13px 15px',display:"flex",backgroundColor:"rgba(0,0,0,0.03)",justifyContent:"space-between"}}>
                                <div style={{display:"flex"}}>
                                    <img alt={"profile"} src={"../logo192.png"} width={"45px"} height={"45px"}/>
                                    <div className={"nameMsg"} style={{display:"flex",flexDirection:"column",alignItems:"flex-start",margin:"5px 0 0 8px",}}>
                                        <span style={nameStyle}>
                                            {this.props.name}
                                        </span>
                                        <p style={{lineHeight:1, margin:"9px 0", color:'silver', fontSize:"14px"}}>
                                        {this.props.email}
                                        </p>
                                    </div>
                                </div>
                                {
                                    this.renderSwitch(this.state.friendShip)
                                }
                            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return state
  }
  
  export default connect(mapStateToProps)(AddFriendResult)
  