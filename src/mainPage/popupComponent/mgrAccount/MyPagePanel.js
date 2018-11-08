import  React, { Component }    from    'react';
import  Popup                   from    "reactjs-popup";
import  axios                   from    'axios';
import  myUtil                  from    './../../../util/myUtil'

import  './css/RegisterPanel.css';
class MyPagePanel extends Component{
//<button className="w3-bar-item w3-button">Login</button>
    constructor(props){
        super(props);
        this.state  =   {
            email       :   this.props.email,
            password1   :   "",
            password2   :   "",
            password3   :   "",
            nickname    :   this.props.nickname,
            img_id      :   this.props.img_id,
            img_url     :   this.props.img_url
        }//state init
        this.setEmail       =   this.setEmail.bind(this);
        this.setPassword1   =   this.setPassword1.bind(this);
        this.setPassword2   =   this.setPassword2.bind(this);
        this.setPassword3   =   this.setPassword3.bind(this);
        this.setNickname    =   this.setNickname.bind(this);
        this.setImg_id      =   this.setImg_id.bind(this);
        this.registerProc   =   this.registerProc.bind(this);
        this.imgUploadOpener    =   this.imgUploadOpener.bind(this);
        window.onmessage    =   (e) => {
            alert("RegisterPanel.imgReciver >>> 메서드 호출됨");
            console.log("e.data : ",e.data);
            this.setState({
                img_id  :   e.data.img_id,
                img_url :   e.data.img_url
            })
        }
        
        
    }//constructor 
    componentDidUpdate(prevProps, prevState){
        console.log("MyPagePanel.componentDidUpdate >>> ",this.props);
        console.log("MyPagePanel.componentDidUpdate >>> "+prevState.email);
        console.log("MyPagePanel.componentDidUpdate >>> "+this.state.email);
        if(prevState.email !== this.props.email){
            this.setState({
                email       :   this.props.email,
                nickname    :   this.props.nickname,
                img_id      :   this.props.img_id,
                img_url     :   this.props.img_url
            })
        }
    }
    
    
    //### 회원가입 setter 메서드 ###
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
    setPassword3(e){
        console.log("LoginPanel.setPassword3 >>> e : ",e.target.value);
        this.setState({
            password3   :   e.target.value
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
    //###_______________________###

    //###이미지 업로드 페이지###
    //window.open('profileImgUploader.do','_fileupload','width=800, height=600');
    imgUploadOpener(){
        window.open(new myUtil().serverUrl+'profileImgUploader.do','_fileupload','width=800, height=600');
    }
    
    //###___________________###
    
    //### 회원가입 데이터 전송 메서드 ###
       
    registerProc = (close) => {
        
        axios.get(new myUtil().serverUrl+"registerProc.do",{
			params : {
                ssnId       :   localStorage.ssnId,
                pw1         :   this.state.password1,
                pw2         :   this.state.password1,
                pw3         :   this.state.password1,
                nickname    :   this.state.nickname,
                profImg     :   this.state.img_id
			}
		})
		.then( (response)=>{
            console.log("response : ",response);
            if( response.data.updateChecker === "true" ){
                alert("정보 수정이 완료되었습니다");
                this.props.toggleSidebar();
                close();
            }
            else{
                alert("정보수정에 실패했습니다.");
            }
            
		})
		.catch((error)=>{
            console.log("error : ",error);
            alert("정보수정에 실패했습니다");
		})
    }
    //###___________________________###

    render(){
        const fontStyle={
            fontWeight  :   "bold"
        }
        
        return (
<Popup className="regPanelWrapper" 
        trigger={
            <input className="w3-btn  btnMargin btnBorderBottom" type ="button" value="마이페이지"
                disabled={this.props.myPageBtn}>
            </input>
        } 
        modal closeOnDocumentClick>
    {close => (
        <div className="w3-white w3-card-4" style={{width: "100%"}}>
            <div className="w3-container w3-bar ">
                <h2 className="w3-bar-item popup-closer">MyPage...</h2>
                <h2 className="w3-bar-item w3-right w3-button popup-closer" onClick={close} >
                    <i className="im im-x-mark"></i>
                </h2>
            </div>
            <div className="w3-container  " style={{marginTop: "-1px"}}>
                <hr className="w3-black"></hr>
            </div>
            
            <div className="w3-container">
                <label className="" style={fontStyle}>프로필 이미지</label>
                <br></br>
                <div className="regThumbWrapper" >
                    <img alt="" src={this.state.img_url} style={{width: 128, height: 128}}></img>
                    <input type="hidden" value={this.state.img_id}></input>
                </div>
                <input className="w3-btn btnMargin btnBorderBottom profileImgBtn" type="button" value="수정"
                                                                                        onClick={this.imgUploadOpener}>
                </input>
                <br></br>
                <label  style={fontStyle}>E-mail</label>
                <label className="  errMsg" style={fontStyle}>___이메일을 입력하십시오</label>
                <label className="  errMsg" style={fontStyle}>___존재하지 않는 이메일입니다</label>
                <input className="w3-input w3-border w3-round-large" type="text" name="email" value={this.state.email}
                                                                                        onChange={this.setEmail}></input>

                <br></br>
                <label   style={fontStyle}>Previous Password</label>
                <label className="  errMsg"   style={fontStyle}>___패스워드를 입력하십시오</label>
                <label className="  errMsg"  style={fontStyle}>___패스워드가 일치하지 않습니다</label>
                <input className="w3-input w3-border w3-round-large" type="password"  
                                                                                        onChange={this.setPassword1}></input>

                <br></br>
                <label   style={fontStyle}>New Password</label>
                <label className="  errMsg"   style={fontStyle}>___패스워드를 입력하십시오</label>
                <label className="  errMsg"  style={fontStyle}>___패스워드가 일치하지 않습니다</label>
                <input className="w3-input w3-border w3-round-large" type="password"  
                                                                                        onChange={this.setPassword2}></input>

                <br></br>
                <label   style={fontStyle}>New Password Check</label>
                <label className="  errMsg"   style={fontStyle}>___패스워드를 재확인해주십시오</label>
                <label className="  errMsg"  style={fontStyle}>___패스워드가 일치하지 않습니다</label>
                <input className="w3-input w3-border w3-round-large" type="password" 
                                                                                        onChange={this.setPassword3}></input>

                <br></br>
                <label  style={fontStyle}>Nickname</label>
                <label className="  errMsg" style={fontStyle}>___닉네임을 입력하십시오</label>
                <input className="w3-input w3-border w3-round-large" type="text"name="nickname" value={this.state.nickname}
                                                                                        onChange={this.setNickname}></input>

                <br></br>
                <input className="w3-btn  btnMargin btnBorderBottom" type ="button" value="회원가입"
                                                                    onClick={()=>this.registerProc(close)}>
                </input>
                    
                <input className="w3-btn  btnBorderBottom"
                    type ="button" onClick={close} value="뒤로가기"></input>
                <br></br><br></br>
            </div>
        </div>
    )}
</Popup>
        )
    }
}

export default MyPagePanel;