import React from "react"

class NotificationPanel extends React.Component{
    constructor(props)
    {
        super(props);
        this.visible = ["hidden","visible"];

    }
    stopPropagation(e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()
    }

    render(){
        const blackStyle = {
            visibility:this.visible[+this.props.visibility],
            opacity:+this.props.visibility,
            transition: "visibility 0s, opacity 1.5s linear;",

    }
        return (
            <div id={"black"} style={blackStyle} onClick={() => this.props.toggleVisibility(false)}>
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