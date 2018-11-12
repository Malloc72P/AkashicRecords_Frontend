import  React, { Component }    from    'react';
import  Popup                   from    "reactjs-popup";
import  axios                   from    'axios';
import  myUtil                  from    './../../../util/myUtil'

class AdminPagePwChecker extends Component{
    constructor(props){
        super(props);
        console.log("AdminPagePwChecker.constructor >>> 메서드 호출됨");
        this.state  =   {
            password        :   "",
            pwBtn           :   false,
            adminPageBtn    :   true
        }//state init

        this.setPassword        =   this.setPassword.bind(this);
        this.adminPageOpener    =   this.adminPageOpener.bind(this);
    }
    setPassword(e){
        console.log("LoginPanel.setPassword >>> e : ",e.target.value);
        this.setState({
            password   :   e.target.value
        })
    }
    submitPwData = (close)=>{
        axios.get( new myUtil().serverUrl+"adminPwCheckProc.do",{
            params:{
                ssnId       :   localStorage.ssnId
                ,password   :   this.state.password
            }
        })
        .then( (response)=>{
            console.log("response : ",response);
            var res = response.data;
            
            if(res.validator === "true" && res.activation === "true"){
               this.setState({
                    adminPageBtn    :   false,
                    pwBtn           :   true
               });
               console.log(this.state);
            }
            else{
                alert("본인확인에 실패했습니다.");
                this.props.toggleSidebar();
            }
            
        })
        .catch( (error)=>{
            console.log("error : ",error);
            alert("본인확인에 실패했습니다.");
            this.props.toggleSidebar();
            close();
        })
    }
    adminPageOpener = (close) => {
        close();
        
        var url 	=	new myUtil().serverUrl+"adminPage.do";
        var title	=	"adminPage";
        var pwForm	=	document.createElement("form");

        window.open("",title,"width=1080, height=600");

        pwForm.setAttribute("target",title);
        pwForm.setAttribute("charset","UTF-8");
        pwForm.setAttribute("method","post");
        pwForm.setAttribute("action",url);

        var hf  =   document.createElement("input");
        hf.setAttribute("type",     "hidden");
        hf.setAttribute("name",     "password");
        hf.setAttribute("value",    this.state.password);
        pwForm.appendChild(hf);

        var hf2  =   document.createElement("input");
        hf2.setAttribute("type",     "hidden");
        hf2.setAttribute("name",     "ssnId");
        hf2.setAttribute("value",    localStorage.ssnId);
        pwForm.appendChild(hf2);

        document.body.appendChild(pwForm);
        pwForm.submit();
    }
    render(){
        const fontStyle={
            fontWeight  :   "bold"
        }
        return(
            <Popup trigger={ <button className="w3-bar-item w3-button">AdminPage</button> } modal closeOnDocumentClick>
            {
                close => (
                    <div className="w3-white w3-card-4" style={{width: "100%"}}>
                        <div className="w3-container w3-bar ">
                            <h2 className="w3-bar-item pwCheckPanel">관리자 확인...</h2>
                            <h2 className="w3-bar-item w3-right w3-button popup-closer" onClick={close} ><i className="im im-x-mark"></i></h2>
                        </div>
                        <div className="w3-container  " style={{marginTop: "-1px"}}>
                            <hr className="w3-black"></hr>
                        </div>
                        
                        <div className="w3-container">
                            <br></br>
                            
                            <br></br>
                            <label   style={fontStyle}>Password</label>
                            <label className="  errMsg"   style={fontStyle}>___패스워드를 입력하십시오</label>
                            <input className="w3-input w3-border w3-round-large" type="password" name="password" 
                                                        disabled={this.state.pwBtn} onChange={this.setPassword}></input>
                            <br></br>
                            <input className="w3-btn  btnMargin btnBorderBottom" type ="button" value="패스워드 확인"
                                                disabled={this.state.pwBtn}         onClick={ ()=>this.submitPwData(close)}>
                            </input>

                            <input className="w3-btn  btnMargin btnBorderBottom" type ="button" value="관리자페이지"
                                    disabled={this.state.adminPageBtn} onClick={()=>this.adminPageOpener(close)}> 
                            </input>
                            

                            <input className="w3-btn  btnBorderBottom"  type ="button" name="bt_goBack"  
                                                                                onClick={close} value="뒤로가기">
                            </input>
                            <br></br><br></br>
                        </div>
                    </div>
                )
            }
            </Popup>    
        );
    }
}
export default AdminPagePwChecker;