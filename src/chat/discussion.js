import React from 'react'
import Contact from "./contact"
import contactList from "./contacts"
class Discussion extends React.Component{
    constructor(props){
        super(props)
        // this.setSelectedContact = this.setSelectedContact.bind(this);
    
    }
      
    render(){ 
        const discussionContainerStyle={display:"flex", flexDirection:"column", height:"100%"}
        const searchStyle={backgroundColor:"transparent",
                            border:"none",
                            height : "40px",
                            color:"white",
                            width:"100%",
                            marginLeft:"5px",
                            outline:"none",
                            borderTop:"solid 1px #5a6d80d1",
                        }
        
        return(
        <div style={discussionContainerStyle}>
            <div id={"searchZone"} style={{
                backgroundColor:"#5a6d80d1",
                display:'flex',
                alignItems:'center',
                width:"90%",
                margin:"0 auto",
                padding:"0 10px"
            }}>
                <svg style={{color:"white"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                <input autoComplete={"off"} id={"search"} type={"search"} name={"search"} placeholder={"search a contact..."} style={searchStyle} />
            </div>
            <div id={"chats"} style={{overflowX: "hidden", overflowY: "scroll",}}>
                {contactList.map((contact) =>  
                {  
                    let isActive = this.props.selectedContact === contact.name; 
                    return (
                        <Contact name={contact.name} key={contact.name} lastMessage={contact.lastMessage} statut={""} selected={isActive} customOnClick={this.props.onChangeContact} />
                    )
                })
                }
            </div>
        </div>
        )

    }
}

export default Discussion