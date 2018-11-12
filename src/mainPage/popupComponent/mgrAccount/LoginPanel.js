import  React, { Component }    from 'react';
import  Popup                   from "reactjs-popup";
import  myUtil                  from './../../../util/myUtil';
import  $                       from    'jquery';

import  './../popupOverrider.css';
class LoginPanel extends Component{

    constructor(props){
        super(props);
        this.state  =   {
            email       :   "",
            password    :   ""
        }//state init

        this.setEmail           =   this.setEmail.bind(this);
        this.setPassword        =   this.setPassword.bind(this);
    }
    
    setEmail(e){
        console.log("LoginPanel.setEmail >>> e : ",e.target.value);
        this.setState({
            email   :   e.target.value
        })
    }
    setPassword(e){
        console.log("LoginPanel.setPassword >>> e : ",e.target.value);
        this.setState({
            password   :   e.target.value
        })
    }

    submitLoginData = (close) => {
        $.ajax( 
            {
                method : "post",
                url    : new myUtil().serverUrl+"loginProc.do",
                data   : { 
                    email       :   this.state.email,
                    password    :   this.state.password
                },
                success : (result) => {
                    console.log("myPage >>> response : ",result);
                    var jsonRes = JSON.parse(result)
                    var checker = jsonRes.loginChecker;
                    console.log("myPage >>> checker : ",checker);
                    if( checker === "true" ){
                        localStorage.ssnId  =   jsonRes.ssnId;
                        this.props.setSidebarMode(checker, jsonRes.adminCheck);
                        this.props.setLoginStatus(checker, jsonRes.adminCheck, jsonRes.email);

                        close();
                    }
                    else{
                        alert("로그인에 실패했습니다.");
                    }
                }//success()
            }//ajax {}
        )//.ajax()
    }
    
    
    render(){
        const fontStyle={
            fontWeight  :   "bold"
        }
        return (
            <Popup trigger={ <button className="w3-bar-item w3-button"> Login</button> } modal closeOnDocumentClick>
                {close => (
                    <div className="w3-white w3-card-4" style={{width: "100%"}}>
                        <div className="w3-container w3-bar ">
                            <h2 className="w3-bar-item popup-closer">Login...</h2>
                            <h2 className="w3-bar-item w3-right w3-button popup-closer" onClick={close} ><i className="im im-x-mark"></i></h2>
                        </div>
                        <div className="w3-container  " style={{marginTop: "-1px"}}>
                            <hr className="w3-black"></hr>
                        </div>
                        
                        <form className="w3-container" name="login_form" method="post" action="loginProc.do">
                            <br></br>
                            <label  style={fontStyle}>E-mail</label>
                            <label className="  errMsg" style={fontStyle}>___이메일을 입력하십시오</label>
                            <label className="  errMsg" style={fontStyle}>___존재하지 않는 이메일입니다</label>
                            <input className="w3-input w3-border w3-round-large" type="text"name="email"
                                                                                                        onChange={this.setEmail} ></input>
                            <br></br>
                            <label   style={fontStyle}>Password</label>
                            <label className="  errMsg"   style={fontStyle}>___패스워드를 입력하십시오</label>
                            <label className="  errMsg"  style={fontStyle}>___패스워드가 일치하지 않습니다</label>
                            <input className="w3-input w3-border w3-round-large" type="password" name="password" 
                                                                                                        onChange={this.setPassword}></input>
                            <br></br>
                            <input className="w3-btn  btnMargin btnBorderBottom"
                                type ="button" name="bt_submit"  value="로그인"
                                onClick={ ()=>this.submitLoginData(close)}></input>
                                
                            <input className="w3-btn  btnBorderBottom"
                                type ="button" name="bt_goBack"  onClick={close} value="뒤로가기"></input>
                            <br></br><br></br>
                        </form>
                    </div>
                )}
                
            </Popup>
        )
    }
}//component

export default LoginPanel;