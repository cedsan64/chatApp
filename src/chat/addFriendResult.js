import React from "react"

class AddFriendResult extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {alreadyFriend:this.props.alreadyFriend}

    }

    addFriend(user){
        if (user.length === 0) return;
         fetch("http://localhost:3030/addfriend?user="+user,{
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("userToken")
            },
         })
          .then(res => res.json())
          .then(
            (result) => {
                // console.log(result)
                if (result.status === 200) {   
                    this.setState({alreadyFriend:true})
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
         fetch("http://localhost:3030/removefriend?user="+user,{
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("userToken")
            },
         })
          .then(res => res.json())
          .then(
            (result) => {
                // console.log(result)
                if (result.status === 200) {   
                    this.setState({alreadyFriend:false})

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
        const nameStyle={
            // marginBottom:"10px",
            color:"black",
            fontSize:"15px",
            selfAlign:"start",
            fontWeight:"600",
            textTransform:"capitalize"
    
        }
        const btnStyle = {alignSelf:"center",height:"auto",fontSize:"11px",padding:"4px",marginTop:"10px",}
        const cancelBtnStyle={alignSelf:"center",height:"auto",fontSize:"11px",padding:"4px",marginTop:"10px",backgroundColor:"transparent",color:"tomato",border:"solid 1px tomato"}
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
                                    this.state.alreadyFriend ?
                                    <button onClick={() =>this.removeFriend(this.props.email)} className={"btn"} style={cancelBtnStyle}>
                                        cancel request
                                        <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:5,verticalAlign:"text-bottom"}} width="14" height="14" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                        </svg>
                                    </button>    
                                    :
                                    <button onClick={() => this.addFriend(this.props.email)} className={"btn"} style={btnStyle}>
                                    send request
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:5,verticalAlign:"text-bottom"}} width="14" height="14" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                    </button>
                                    
                                }
                            </div>
        )
    }

}

export default AddFriendResult