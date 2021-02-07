import React from "react"
import './style.css';
import {connect} from "react-redux"
import { changeAuth, changeUsername } from '../redux/actions';
class Signup extends React.Component{
constructor(props)
{
    super(props);
    this.state={errorUsername:"#",errorPsswd:"#",errorEmail:"#",errorCgu:"#"}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.userName="";
    this.passwd="";
    this.email="";
    this.cgu = false
}

setAuth(token){
    localStorage.setItem("userToken",token)
    this.props.dispatch(changeAuth(true));

}

    handleSubmit(event){
        event.preventDefault();
        this.setState({
            errorEmail: "#",
            errorUsername: "#",
            errorPsswd:"#",
            errorCgu: "#",
        })  
        let data =  JSON.stringify({
            username: this.userName,
            password: this.passwd,
            email: this.email,
            guc : this.cgu,
        })
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/register`, {
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
                  case 400:
                        let errors = result.response;
                        console.log(errors)
                        this.setState({
                        errorEmail: errors.email !== undefined ?  errors.email : "#",
                        errorUsername: errors.username !== undefined ?  errors.username : "#",
                        errorPsswd: errors.password !== undefined ?  errors.password : "#",
                        errorCgu: errors.guc !== undefined ? errors.guc : "#",

                        }) 
                    break;
                  case 500:
                      alert(result.response)
                      break
                  default:
                      alert("error somewhere! ^_^' !!!")
                      break;
              }
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
                            <h3 style={{textAlign:"center",marginTop:0}}>Sign Up to <strong>ChatNet</strong></h3>
                        </div>
                        <form id={"loginPost"} onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="form-group first">
                                <label style={labelStyle} htmlFor="username">Username</label>
                                <input onChange={(e) => {this.userName = e.target.value}} type="text" className="form-control" placeholder="username" id="username" required/>
                                <span className={"errorCredidential"} style={{opacity:this.state.errorUsername.length > 1 ? 1 :0 } }> {this.state.errorUsername}</span>
                            
                            </div>
                            <div className="form-group ">
                                <label style={labelStyle} htmlFor="Email">Email</label>
                                <input onChange={(e) => {this.email = e.target.value}} type="mail" className="form-control" placeholder="your-email@gmail.com" id="Email" required/>
                                <span className={"errorCredidential"} style={{opacity:this.state.errorEmail.length > 1 ? 1 :0 } }> {this.state.errorEmail}</span>
                            
                            </div>
                            <div className="form-group last mb-3">
                                <label style={labelStyle} htmlFor="password">Password</label>
                                <input onChange={(e) => {this.passwd = e.target.value}} type="password" className="form-control" placeholder="Your Password" id="password" required/>
                                <span className={"errorCredidential"} style={{opacity:this.state.errorPsswd.length > 1 ? 1 :0 } }> {this.state.errorPsswd}</span>
                            
                            </div>
                        
                            <div className="d-sm-flex align-items-center" style={{display:'flex' ,justifyContent:"space-between",}}>
                                <label style={labelStyle} className="control control--checkbox mb-3 mb-sm-0"><span className="caption">Accept the General Use Conditions</span>
                                    <input type="checkbox" onChange={(e) => {this.cgu = e.target.checked}} required />
                                    <div className="control__indicator">
                                        {/* <span className={"OK"}>0</span> */}
                                    </div>
                                </label>
                            </div>
                            <span className={"errorCredidential mb-5"} style={{display:"block",opacity:this.state.errorCgu.length > 1 ? 1 :0 } }> {this.state.errorCgu}</span>

                            <input type="submit" value="Validate" className="btn btn-block btn-primary" />

                        </form>
                        <p style={{textAlign:"center"}} className="forgot-pass">Already registered? Sign in 
                         <span onClick={() => this.props.changePage("signin")} style={{fontWeight:"600",cursor:"pointer"}} > here</span>
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
  
  export default connect(mapStateToProps)(Signup)