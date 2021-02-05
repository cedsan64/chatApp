import React from 'react'

class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {status:0, panelVisibility:false}
        this.statusColor = ["#59ff75","#ffbc59","#ff5959","#bdbdbd"] 
        this.visibilityStatus = ["none","block"]
    }

    render(){
        const headerStyle={display:"flex", 
        flexDirection:"row", 
        alignItems:"center", 
        height:"100%",
        borderBottom:"solid 1px #5a6d80d1",
        justifyContent:"space-between",
        // borderBottom:"solid 1px black",
        
        padding:"0 35px"
        }
        const nameStyle={
            marginLeft:"10px",
            color:"white",
            fontSize:"17px",
            fontWeight:"500"
        }
        const imgSlotStyle={
            width:"42px",
            padding:"3px",
            height:"42px",
            border:"solid 2px "+this.statusColor[this.state.status],
            borderRadius:"42px",
        }
        const optionPanelStyle= {
            position:"absolute",
            right:"0",
            display:this.visibilityStatus[+this.state.panelVisibility],
        }
        return(
           <div style={headerStyle}>
                <div style={{display:"flex",alignItems:'center', cursor:"pointer",}}>
                    <div style={imgSlotStyle}  onClick={() => console.log("change Photo")}>
                        <img alt={"profile"} src={"logo192.png"} width={"42px"} height={"42px"}/>
                    </div>
                    <span style={nameStyle}>
                        Jhon Cena
                    </span>
               </div>
               <div style={{
                    position:"relative",
                }}>

                <button style={{
                    backgroundColor:"rgba(0,0,0,0)",
                    color:"#fff",
                    border:"none",
                    width:"25px",
                    height:"23px",
                    borderRadius:"5px",
                    // fontWeight:""
                    position:"relative",
                    outline:"none",
                    cursor:"pointer",
                }}
                onClick={()=> this.setState({panelVisibility:!this.state.panelVisibility})}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
                </button>
                <div className={"optionPanel"} style={optionPanelStyle}>
                    <a href="/" style={{color:'white'}}>Logout</a>
                </div>
                </div>
           </div>
        )
    }
}

export default Header