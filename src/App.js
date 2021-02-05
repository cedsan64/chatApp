// import logo from './logo.svg';
import './App.css';
import React from 'react'
import Chat from './chat/chat'
import Home from './home/home'
import {BrowserRouter, Switch, Route,Redirect} from "react-router-dom"
import {connect} from "react-redux"
import { changeAuth } from './redux/actions';
class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={loaded:false}
    // this.setAuthState = this.setAuthState.bind(this)  
  }

    componentDidMount() {
      let token = localStorage.getItem("userToken")
      // console.log(token)
      if (token !== null) {
        this.props.dispatch(changeAuth(true));
      }
      this.setState({loaded:true})

      // fetch("http://localhost:8080/status")
      //     .then(res => res.json())
      //     .then(
      //       (result) => {
      //           // console.log(result)
      //         this.setState({
      //           isAuthenticated:result.status,loaded:true
      //         });
      //       },
      //       // Remarque : il est important de traiter les erreurs ici
      //       // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
      //       // des exceptions provenant de réels bugs du composant.
      //       (error) => {    
      //         console.log(error)
      //       }
      //     )
      }

  render(){
    // console.log(this.props, localStorage.getItem("userToken"))
    if (!this.state.loaded) {
      return (
        <div style={{position:"absolute",left:0,right:0,top:0,bottom:0}}>
          <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100%"}}>
            <img style={{}} width={"100px"} height={"100px"} src={"images/Double Ring-1.5s-197px.gif"} />
            <p style={{position:'absolute',bottom:0}}>
              <a href="https://loading.io" target={"_blank"}>
                the loading is provided by loading.io
              </a>
            </p>
          </div>
        </div>

      )
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"}> 
                  {this.props.isAuthenticated ? <Redirect to="/chat" /> : <Redirect to="/authentication" />  }
                </Route>
                <Route exact path={"/authentication"}> 
                  {this.props.isAuthenticated ? <Redirect to="/chat" /> : <Home />  }
                </Route>
                <Route exact path={"/chat"}> 
                  {this.props.isAuthenticated ?  <Chat />  : <Redirect to="/authentication" />  }
                </Route>

            </Switch>
        </BrowserRouter>
  );
  }
} 
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(App)