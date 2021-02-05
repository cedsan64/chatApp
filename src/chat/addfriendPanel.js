import React from "react"
import AddFriendResult from "./addFriendResult"
class AddfriendPanel extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={friendListTab:true,founded:[]}
        this.visible = ["none","block"]
        this.hoverColor = ["white","rgba(0,0,0,0.03)"]
    }
    
    stopPropagation(e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()
    }

    searchFriend(user){
        if (user.length === 0) this.setState({founded:[] });
         fetch("http://localhost:3030/finduser?q="+user,{
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
                        founded:result.data
                    });
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

    render(){
        const searchStyle={backgroundColor:"transparent",
        border:"none",
        height : "40px",
        color:"white",
        width:"100%",
        marginLeft:"5px",
        outline:"none",
        borderTop:"solid 1px #5a6d80d1",
    }


        return (
            <div id={"black"} style={{display:this.visible[+this.props.visibility]}} onClick={() => this.props.toggleVisibility(false)}>
                <div id={"addFriend"} className={"winModal"} onClick={(e) => this.stopPropagation(e)}>
                    <div className={"winModalTitle"}>
                        <p> Add Friends</p>
                    </div>

                    <div className={"winModalContainer"}>
                        <div id={"searchZone"} style={{
                                backgroundColor:"#5a6d80d1",
                                display:'flex',
                                alignItems:'center',
                                width:"90%",
                                height:"10%",
                                margin:"0 auto",
                                padding:"0 10px"
                            }}>
                            <input autoComplete={"off"} id={"search"} type={"search"} name={"search"} onChange={(e) => this.searchFriend(e.target.value)} placeholder={"Enter a username..."} style={searchStyle} />

                        </div>
                        <div style={{height:'90%',overflowY:"scroll"}} >
                            {
                                this.state.founded.length === 0 
                                ?
                                 <div style={{display:"flex",height:"100%",justifyContent:"center",alignItems:"center"}}>
                                     <span style={{color:"silver"}}>No result</span>
                                 </div>
                                :
                                this.state.founded.map((user) =>{
                                return (
                                    <AddFriendResult key={user.email} name={user.username} alreadyFriend={false} email={user.email}/>
                                )
                            })
                            }
                        </div>
                    </div>
                    
                    {/* <div className={"winModalContainer"} style={{height:'83%',borderBottom:"solid 1px silver"}}>
                        <div className={"tab"} style={{backgroundColor:"red",display:this.visible[+(!this.state.friendListTab)]}}>

                        </div>
                        <div className={"tab"} style={{backgroundColor:"blue",display:this.visible[+this.state.friendListTab]}}>
                            
                        </div>
                    </div>
                    <div className={"winMenu"} style={{height:'7%',display:"flex"}}>
                        <p className={"tabName"} style={{borderRight:"solid 1px",backgroundColor:this.hoverColor[+(!this.state.friendListTab)]}} onClick={() => this.setState({friendListTab:false})} >add friend</p>
                        <p className={"tabName"} style={{backgroundColor:this.hoverColor[+(this.state.friendListTab)]}}  onClick={() => this.setState({friendListTab:true})}>friend list</p>
                    </div> */}

                </div>
                {/* <div id={"addFriend"} className={"winModal"}></div> */}
            </div>
        )
    }

}

export default AddfriendPanel