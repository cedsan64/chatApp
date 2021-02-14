import React from 'react'
import {connect} from "react-redux"

class MessageBubble extends React.Component {
  constructor(props){
    super(props)
    this.state ={loaded:false}
    if (this.props.sender === "me") {
        this.style = {
            backgroundColor:"white",
            alignSelf:"flex-end",
            color:"#313131",
        }
    } else {
        this.style = {
            backgroundColor:"#66809a",
            alignSelf:"flex-start",
            color:"#fff",

            

        }
    }

  }

  render(){
    return (
        <div style={{minWidth:"30px",maxWidth:"45%",padding:"10px",lineHeight:"24px",borderRadius:"5px",margin:"7px 0",position:"relative",boxShadow:"0 0 2px silver",...this.style}}>
            {// ** fleche a gauche ou a droite suivant la source du message
                this.props.sender ==="me" ? (
                    <div style={{
                    width: 0,height: 0,borderStyle: "solid",borderWidth: "13px 16px 0 0",borderColor: "#fff transparent transparent transparent",
                    position:"absolute",right:"-10px",top:"0",boxShadow:"#c0c0c057 0px -1px 0px",
                    }}></div>
                ) : (
                    <div style={{
                    width: 0,height: 0,borderStyle: "solid",borderWidth: "0 13px 16px 0",borderColor: "transparent #66809a transparent transparent",
                    position:"absolute",left:"-10px",top:"0",boxShadow:"#c0c0c057 0px -1px 0px",
                    }}></div>
                )
            }
            

            
            
            <span style={{margin:0,width:"100%",overflowWrap:"anywhere"}}>
                {this.props.message}
            </span>
        </div>
    )
  }
} 
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(MessageBubble)