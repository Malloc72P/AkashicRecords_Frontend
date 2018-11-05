import React, { Component } from 'react';
import Popup from "reactjs-popup";
import './css/RegisterPanel.css';

class MyPagePanel extends Component{
//<button className="w3-bar-item w3-button">Login</button>
    constructor(props){
        super(props);
        this.state  =   {
            email       :   "",
            password1   :   "",
            password2   :   "",
            nickname    :   "",
            setImg_id   :   ""
        }//state init
        this.setEmail       =   this.setEmail.bind(this);
        this.setPassword1   =   this.setPassword1.bind(this);
        this.setPassword2   =   this.setPassword2.bind(this);
        this.setNickname    =   this.setNickname.bind(this);
        this.setImg_id      =   this.setImg_id.bind(this);
    }
    setEmail(e){
        console.log("LoginPanel.setEmail >>> e : ",e.target.value);
        this.setState({
            email   :   e.target.value
        })
    }
    setPassword1(e){
        console.log("LoginPanel.setPassword1 >>> e : ",e.target.value);
        this.setState({
            password1   :   e.target.value
        })
    }
    setPassword2(e){
        console.log("LoginPanel.setPassword2 >>> e : ",e.target.value);
        this.setState({
            password2   :   e.target.value
        })
    }
    setNickname(e){
        console.log("LoginPanel.setNickname >>> e : ",e.target.value);
        this.setState({
            nickname   :   e.target.value
        })
    }
    setImg_id(e){
        console.log("LoginPanel.setImg_id >>> e : ",e.target.value);
        this.setState({
            img_id   :   e.target.value
        })
    }

    render(){
        const regPanelStyle = {
            width       : "100%",
            height      : "100%",
            overflowY   : "scroll"
        }
        const fontStyle={
            fontWeight  :   "bold"
        }
        return (
            <Popup trigger={ <button className="w3-bar-item w3-button">MyPage</button> } modal closeOnDocumentClick>
                {close => (
                    <div className="w3-white w3-card-4" style={{width: "100%"}}>
                        <div className="w3-container w3-bar ">
                            <h2 className="w3-bar-item popup-closer">MyPage...</h2>
                            <h2 className="w3-bar-item w3-right w3-button popup-closer" onClick={close} ><i className="im im-x-mark"></i></h2>
                        </div>
                        <div className="w3-container  " style={{marginTop: "-1px"}}>
                            <hr className="w3-black"></hr>
                        </div>
                        
                        <form className="w3-container" name="login_form" method="post" action="loginProc.do" >
                            <label className="" style={fontStyle}>프로필 이미지</label>
                            <br></br>
                            <div className="regThumbWrapper" >
                                <img alt="" id="id_img_regThumb" src="" style={{width: 128, height: 128}}></img>
                                <input type="hidden" value="-1"></input>
                            </div>
                            <input className="w3-btn btnMargin btnBorderBottom profileImgBtn" 
                                type="button" name="reg_btn_submit" value="수정"></input>
                            <br></br>
                            <label  style={fontStyle}>E-mail</label>
                            <label className="  errMsg" style={fontStyle}>___이메일을 입력하십시오</label>
                            <label className="  errMsg" style={fontStyle}>___존재하지 않는 이메일입니다</label>
                            <input className="w3-input w3-border w3-round-large" type="text"name="email" 
                                                                                                    onChange={this.setEmail}></input>

                            <br></br>
                            <label   style={fontStyle}>Password</label>
                            <label className="  errMsg"   style={fontStyle}>___패스워드를 입력하십시오</label>
                            <label className="  errMsg"  style={fontStyle}>___패스워드가 일치하지 않습니다</label>
                            <input className="w3-input w3-border w3-round-large" type="password" name="password1"  
                                                                                                    onChange={this.setPassword1}></input>

                            <br></br>
                            <label   style={fontStyle}>Password Check</label>
                            <label className="  errMsg"   style={fontStyle}>___패스워드를 재확인해주십시오</label>
                            <label className="  errMsg"  style={fontStyle}>___패스워드가 일치하지 않습니다</label>
                            <input className="w3-input w3-border w3-round-large" type="password" name="password2" 
                                                                                                    onChange={this.setPassword2}></input>

                            <br></br>
                            <label  style={fontStyle}>Nickname</label>
                            <label className="  errMsg" style={fontStyle}>___닉네임을 입력하십시오</label>
                            <input className="w3-input w3-border w3-round-large" type="text"name="nickname" 
                                                                                                    onChange={this.setNickname}></input>

                            <br></br>
                            <input className="w3-btn  btnMargin btnBorderBottom"
                                type ="submit" name="bt_submit"  value="로그인"></input>
                                
                            <input className="w3-btn  btnBorderBottom"
                                type ="button" name="bt_goBack"  onClick={close} value="뒤로가기"></input>
                            <br></br><br></br>
                        </form>
                    </div>
                )}
            </Popup>
        )
    }
}

export default MyPagePanel;