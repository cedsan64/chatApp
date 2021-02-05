import React from "react"

class NotificationPanel extends React.Component{
    constructor(props)
    {
        super(props);
        this.visible = ["none","block"]

    }
    stopPropagation(e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()
    }

    render(){
        return (
            <div id={"black"} style={{display:this.visible[+this.props.visibility]}} onClick={() => this.props.toggleVisibility(false)}>
                <div id={"notification"} className={"winModal"} onClick={(e) => this.stopPropagation(e)}>
                    <div className={"winModalTitle"}>
                        <p >Notifications</p>
                    </div>
                    <div className={"winModalContainer"}>

                    </div>
                </div>
                {/* <div id={"addFriend"} className={"winModal"}></div> */}
            </div>
        )
    }

}

export default NotificationPanel