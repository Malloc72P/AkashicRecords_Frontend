import  React, { Component }    from    'react';
import  Popup                   from    "reactjs-popup";
import  axios                   from    'axios';
import  myUtil                  from    './../../../util/myUtil'
import  {Link}                  from    'react-router-dom';

class SeriesWritePagePwChecker extends Component{
    constructor(props){
        super(props);
        console.log("SeriesWritePagePwChecker.constructor >>> 메서드 호출됨");
        this.state  =   {
            password        :   "",
            pwBtn           :   false,
            adminPageBtn    :   true
        }//state init

        this.setPassword        =   this.setPassword.bind(this);
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
            
            if(res.validator === "true" && res.validator === "true"){
               this.setState({
                    adminPageBtn   :   false,
                    pwBtn       :   true
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
    
    render(){
        const fontStyle={
            fontWeight  :   "bold"
        }
        var pageOpener = null;
        if(this.state.pwBtn){
            pageOpener  =   (
                <Link   to="/mainPage/writeSeries"
                        className="w3-btn  btnMargin btnBorderBottom"
                        disabled={this.state.adminPageBtn}> 
                        시리즈 작성
                </Link>
            );
        }
        else{
            pageOpener  =   (
                <button   to="/mainPage/writeSeries"
                        className="w3-btn  btnMargin btnBorderBottom"
                        disabled={this.state.adminPageBtn}> 
                        시리즈 작성
                </button>
            );
        }
        return(
            <Popup 
                trigger={ 
                    <button className="w3-right w3-bar-item w3-button w3-mobile" href="#">
						<h5>시리즈 추가</h5>
					</button>
                 } 
                modal closeOnDocumentClick>
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
    
                            {pageOpener}
                            

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
export default SeriesWritePagePwChecker;