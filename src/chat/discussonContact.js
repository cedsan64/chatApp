// import logo from './logo.svg';
import React from 'react'
import {connect} from "react-redux"
import { changeAuth } from '../redux/actions';
import Discussion from "./discussion"
import NotificationPanel from "./notificationPanel"
import AddfriendPanel from "./addfriendPanel"

class DiscussionContact extends React.Component {
  constructor(props){
    super(props)
    this.state = {status:0, NotificationPanelVisibility:false, addFriendPanelVisibility:false,notificationNumber:1,username:""}
    this.statusColor = ["#2ecc71","#ffbc59","#ff5959","#bdbdbd"] 
    this.visibilityStatus = ["none","block"]
    this.flex=[0,130] // regulateur de taille pour la partie menu deroulant
    this.chevronRotation = [0,180]
    this.showNotification = this.showNotification.bind(this)
    this.showAddfriend = this.showAddfriend.bind(this)
}
  
    showNotification(visibility){
        this.setState({NotificationPanelVisibility:visibility})
    }
    showAddfriend(visibility){
        console.log("eeee")
        this.setState({addFriendPanelVisibility:visibility,})
    }

    logout(){
        localStorage.removeItem("userToken");
        this.props.dispatch(changeAuth(false));
    }

    componentDidMount(){
        fetch("http://localhost:3030/maindata",{
            method: 'get',
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("userToken")
            },
        })
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                username:result.username
              });
            },
            // Remarque : il est important de traiter les erreurs ici
            // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
            // des exceptions provenant de réels bugs du composant.
            (error) => {    
              console.log(error)
            }
          )
    }
    


  render(){
    // console.log(localStorage.getItem("userToken"))
    const discussionsStyle={width:"30%", height:"100%", borderRight:"solid 0px black",backgroundColor:"#2c3e50",display:"flex", flexDirection:"column"}
    const headerButtonStyle = {
      backgroundColor:"rgba(0,0,0,0)",
      color:"#fff",
      border:"none",
      width:"25px",
      height:"23px",
      borderRadius:"5px",
      // fontWeight:""
      marginLeft:"15px",
      position:"relative",
      outline:"none",
      cursor:"pointer",
      }
    const headerStyle={display:"flex", 
        flexDirection:"row", 
        alignItems:"center", 
        // height:"100%",
        justifyContent:"space-between",
        // borderBottom:"solid 1px black",
        
        padding:"25px 35px"
        }
    const nameStyle={
        marginLeft:"10px",
        color:"white",
        fontSize:"17px",
        fontWeight:"500",
        textTransform:"capitalize"

    }
    const imgSlotStyle={
        width:"42px",
        padding:"3px",
        height:"42px",
        // border:"solid 1px silver",
        // border:"solid 2px "+this.statusColor[this.state.status], // todo : a changer lors de l'ajout du changement de statu
        borderRadius:"42px",
    }

    const notificationStyle ={padding:"2px 4px",fontSize:"10px",borderRadius:"5px", backgroundColor:"tomato",position:"absolute",top:"-7px",right:"-5px",display: this.state.notificationNumber > 0 ? "inline" : "none"}

    const optionPanelStyle= {width:"170px",color:'white',borderRadius:"5px", backgroundColor:'#5a6d80d1',textAlign:'center',padding:"7px", margin:"5px"}
    const rotate={transform: "rotate("+this.chevronRotation[+this.state.panelVisibility]+"deg)",transition: "transform 300ms ease-in"}
    
    let notificationNumber = this.state.notificationNumber
    if (notificationNumber > 9) {
        notificationNumber = "9+"   
    }




    return (
    
          <div id="discussions" style={discussionsStyle}>
            <div className={'header'} style={{border:"solid 0px red",overflow:"hidden", height:100+this.flex[+this.state.panelVisibility],transition: "height 300ms ease-in-out"}}>
                <div style={headerStyle}>
                    <div style={{display:"flex",alignItems:'center', cursor:"pointer",}}>
                        <div style={imgSlotStyle}  onClick={() => console.log("change Photo")}>
                            <img alt={"profile"} src={"../logo192.png"} width={"42px"} height={"42px"}/>
                        </div>
                        <span style={nameStyle}>
                            {this.state.username}
                        </span>
                    </div>
                    <div style={{position:"relative",}}>
                        <button style={headerButtonStyle} id={"notificationBtn"} onClick={()=> this.showNotification(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                            </svg>
                            <span style={notificationStyle}>
                                {notificationNumber}
                            </span>
                        </button>

                        <button style={headerButtonStyle} onClick={()=> this.setState({panelVisibility:!this.state.panelVisibility})}>
                            <svg style={rotate} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={"bi bi-chevron-down"} viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                        
                    </div>
                </div>
                <div style={{display:'flex', flexDirection:"column", alignItems:"center"}}>
                    <a style={{color:'white',cursor:"pointer"}}  onClick={()=> this.showAddfriend(true)}>
                        <p style={optionPanelStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={"bi bi-person-plus"} viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                        </svg> Add Contact
                        </p>
                    </a>
                    <a href="/" style={{color:'white'}} onClick={() => this.logout()}>
                        <p style={optionPanelStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={"bi bi-box-arrow-right"} viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg> Logout
                        </p>
                    </a>
                </div>
            </div>
            <div style={{border:"solid 0px green",overflow: "hidden",height:650-this.flex[+this.state.panelVisibility],transition: "height 300ms ease-in-out"}}>
              <Discussion selectedContact={this.props.selectedContact} onChangeContact={this.props.setSelectedContact}/>
            </div>
        
            <NotificationPanel visibility={this.state.NotificationPanelVisibility} toggleVisibility={this.showNotification} />
            <AddfriendPanel visibility={this.state.addFriendPanelVisibility} toggleVisibility={this.showAddfriend} />
    
        </div>
  );
  }
}

const mapStateToProps = (state) => {
    return state
  }
  
export default connect(mapStateToProps)(DiscussionContact)
