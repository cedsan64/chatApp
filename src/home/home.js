import React from "react"
import Login from "./login"
import Signup from "./signup"

// import {BrowserRouter, Switch, Route} from "react-router-dom"

class Home extends React.Component{
    constructor(props)
    {
        super(props);
        this.state ={action:"signin"};
        this.setAction = this.setAction.bind(this);

    }

    setAction(action){
        this.setState({action:action})
    }

    render(){
        if (this.state.action==="signin") {
            return (
                <Login changePage={this.setAction} />
            );
        } else {
            return (
                <Signup changePage={this.setAction} />
            )
        }
    }

}

export default Home