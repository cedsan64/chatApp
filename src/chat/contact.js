import React from 'react'
import {connect} from "react-redux"
import { changeEmail, setSelectedContact } from '../redux/actions';

// import PropTypes from "pr"
class Contact extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {status:1,}
        this.statusColor = ["#59ff75","#ffbc59","#ff5959","#bdbdbd"] 
        this.hoverredColor ="#5a6d80d1"
    }
    check(){
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/status`)
            .then(res => res.json())
            .then(
              (result) => {
                  console.log(result)
              },
            )
      }
    setActive(){
        this.setState({bg:"#32465a"})
    }
    setInactive(){
        this.setState({bg:"transparent"})
    }
    render(){
        this.bgColor = this.props.selected ? "rgb(58 77 97)" : "transparent"
        // console.log(this.)

        const activeContactStyle = {
            display:"flex",
                    borderTop:"solid 1px #5a6d80d1",
                    borderRight:"5px solid rgb(102 128 154)",
                    borderBottom:"solid 1px #5a6d80d1",
                    padding: "13px 25px 10px 25px",
                    cursor:"pointer",
                    backgroundColor:"rgb(58 77 97)",
                    transition: "border-right 100ms ease-in-out",
                    // transition: "background-color 200ms ease-in-out"
        }
        const ContactStyle = {
            display:"flex",
                    borderTop:"solid 1px #5a6d80d1",
                    borderRight:"solid 3px transparent",
                    borderBottom:"solid 1px #5a6d80d1",
                    padding: "13px 25px 10px 25px",
                    cursor:"pointer",
                    backgroundColor:"transparent",
        }

        const nameStyle={
            // marginBottom:"10px",
            color:"white",
            fontSize:"15px",
            selfAlign:"start",
            fontWeight:"600"


        }
        const imgSlotStyle={
            width:"45px",
            padding:"2px",
            height:"45px",
            border:"solid 0px darkgrey",
            borderRadius:"45px",
            position:"relative",
            // overflow:"hidden",
        }
        const activity = {width:"10px",height:"10px",
            backgroundColor:this.statusColor[this.state.status],
            borderRadius:"10px",
            position:"absolute",
            top:"0",left:"0",

        }
        return(

            <div style={this.props.selected ? activeContactStyle : ContactStyle} className={"contactItem"} onClick={() => {this.props.dispatch(setSelectedContact(this.props.name));this.props.dispatch(changeEmail(this.props.email))}}>
                 <div style={{display:"flex",alignItems:'start',}}>
                    <div style={imgSlotStyle}  onClick={() => this.check()}>
                        <div className={"status"} style={activity}>

                        </div>
                        <img alt={"profile"} src={"../logo192.png"} width={"45px"} height={"45px"}/>
                    </div>
                    <div className={"nameMsg"} style={{display:"flex",flexDirection:"column",alignItems:"flex-start",margin:"5px 0 0 8px",}}>
                        <span style={nameStyle}>
                            {this.props.name}
                        </span>
                        <p style={{lineHeight:1, margin:"9px 0", color:'white'}}>
                        {this.props.lastMessage}
                        </p>
                    </div>
               </div>
            </div>
        )

    }

}
const mapStateToProps = (state) => {
    return state
  }
  
  export default connect(mapStateToProps)(Contact)
  