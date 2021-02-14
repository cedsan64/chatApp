import React from "react"
import './style.css';
import {connect} from "react-redux"
import { changeAuth } from '../redux/actions';
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={errorEmail:"#",errorPsswd:"#",}
        this.email=""
        this.passwd=""
    }

    setAuth(token){
        localStorage.setItem("userToken",token)
        this.props.dispatch(changeAuth(true));
    
    }
    

    handleSubmit(event){
        this.setState({
            errorEmail: "#",
            errorUsername: "#",
        }) 
        event.preventDefault() 
        let data =  JSON.stringify({
            email: this.email,
            password: this.passwd,
        })
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data,
        })
        .then(res => res.json())
        .then(
          (result) => {
              console.log(result)
              switch (result.status) {
                  case 200:
                      this.setAuth(result.token)
                      break
                  case 404:
                        let errors = result.response;
                        console.log(errors)
                        this.setState({
                        errorEmail: errors.email !== undefined ?  errors.email : "#",
                        errorUsername: errors.username !== undefined ?  errors.username : "#",

                        }) 
                    break;
                  case 500:
                      alert(result.response)
                      break
                  default:
                      alert("error somewhere! ^_^' !!!")
                      break;
              }
            // this.setState({
            //   isAuthenticated:result.status,loaded:true
            // });
          },
          // Remarque : il est important de traiter les erreurs ici
          // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
          // des exceptions provenant de réels bugs du composant.
          (error) => {    
            console.log(error)
          }
        );
    };

    render(){
        const labelStyle={isplay: "inline-block",marginBottom: "0.5rem",}

        return (
            <div className="container" style={{display: "flex",justifyContent:" center",marginTop:"50px"}}>
                <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                    <div className="form-block mx-auto">
                        <div className="text-center mb-5">
                            <h3 style={{textAlign:"center",marginTop:0}}>Login to <strong>ChatNet</strong></h3>
                        </div>
                        <form id={"loginPost"} onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="form-group first">
                                <label style={labelStyle} htmlFor="email">Email</label>
                                <input onChange={(e) => {this.email = e.target.value}} type="email" className="form-control" placeholder="your-email@gmail.com" id="email" required/>
                                <span className={"errorCredidential"} style={{opacity:this.state.errorEmail.length > 1 ? 1 :0 } }> {this.state.errorEmail}</span>
                            </div>
                            <div className="form-group last mb-3">
                                <label style={labelStyle} htmlFor="password">Password</label>
                                <input onChange={(e) => {this.passwd = e.target.value}} type="password" className="form-control" placeholder="Your Password" id="password" required />
                                <span className={"errorCredidential"} style={{opacity:this.state.errorPsswd.length > 1 ? 1 :0 } }> {this.state.errorPsswd}</span>
                            
                            </div>
                        
                            <div className="d-sm-flex mb-5 align-items-center" style={{display:'flex' ,justifyContent:"space-between",}}>
                                <label style={labelStyle} className="control control--checkbox mb-3 mb-sm-0"><span className="caption">Remember me</span>
                                    <input type="checkbox" />
                                    <div className="control__indicator">
                                        {/* <span className={"OK"}>0</span> */}
                                    </div>
                                </label>
                                <span className="ml-auto"><a href="#" className="forgot-pass" onClick={()=>alert("aba tu as forget ton mdp? c'est ton probleme man")}> {/* TODO: change that */}
                                    Forgot Password</a></span> 
                            </div>

                            <input type="submit" value="Log In" className="btn btn-block btn-primary" />

                        </form>
                        <p style={{textAlign:"center"}} className="forgot-pass">
                            Not registered? Create an account 
                            <span onClick={() => this.props.changePage("signup")} style={{fontWeight:"600",cursor:"pointer"}} > here</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        )
    }

}

const mapStateToProps = (state) => {
    return state
  }
  
  export default connect(mapStateToProps)(Login)