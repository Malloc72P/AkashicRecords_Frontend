import  React, { Component }    from    'react';
import  Popup                   from    "reactjs-popup";
import  $                       from    'jquery';
import  myUtil                  from    './../../../util/myUtil'

class PostDeletePwChecker extends Component{
    constructor(props){
        super(props);
        console.log("PostDeletePwChecker.constructor >>> 메서드 호출됨");
        this.state  =   {
            password        :   "",
            pwBtn           :   false,
            adminPageBtn    :   true
        }//state init

        this.setPassword        =   this.setPassword.bind(this);
        this.deletePost         =   this.deletePost.bind(this);
    }
    setPassword(e){
        console.log("PostDeletePwChecker.setPassword >>> e : ",e.target.value);
        this.setState({
            password   :   e.target.value
        })
    }
    submitPwData = (close)=>{
        $.ajax(
                {
                method  :   "post",
                url     :   new myUtil().serverUrl+"pwCheckProc.do",
                data    :   {
                    ssnId       :   localStorage.ssnId,
                    password   :   this.state.password
                },
                success :   (result) => {
                    console.log("deletePost >>> result : ",result);
                    var jsonRes = JSON.parse(result)
                    
                    if(jsonRes.validator === "true" && jsonRes.activation === "true"){
                    this.setState({
                            adminPageBtn    :   false,
                            pwBtn           :   true
                    });
                    console.log(this.state);
                    }
                    else{
                        alert("본인확인에 실패했습니다.");
                    }
                }
            }
        )
    }
    
    deletePost = (close) => {
        console.log("postDelete >>> 메서드 호출됨");
        $.ajax(
            {
                method  :   "post",
                url     :   new myUtil().serverUrl+"deleteContent.do",
                data    :   {
                    ssnId       :   localStorage.ssnId,
                    post_id     :   this.props.post_id
                },
                success :   (result) => {
                    console.log("deletePost >>> result : ",result);
                    var jsonRes = JSON.parse(result)
                    if( jsonRes.deleteChecker === "true" ){
                        alert("성공적으로 삭제되었습니다");
                        close();
                        this.props.goBack();
                        
                    }
                    else if( jsonRes.deleteChecker === "false" ){
                        alert("포스트 삭제를 실패하였습니다");
                    }
                    else if( jsonRes.deleteChecker === "notYou" ){
                        alert("게시글 작성자만 삭제할 수 있습니다");
                    }
                    else if( jsonRes.deleteChecker === "invalidSession" ){
                        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                    }
                    else{
                        alert("오류가 발생했습니다");
                    }
                    
                }//success()
            }//ajax{}
        )//ajax()
    }
    render(){
        const fontStyle={
            fontWeight  :   "bold"
        }
        return(
            <Popup 
                trigger={ 
                            <button	className=" w3-bar-item w3-button w3-mobile w3-right" style={{marginRight: "31px"}}>
                                <h5>삭제</h5>
                            </button>
                        } 
                modal 
                closeOnDocumentClick>
            {
                close => (
                    <div className="w3-white w3-card-4" style={{width: "100%"}}>
                        <div className="w3-container w3-bar ">
                            <h2 className="w3-bar-item pwCheckPanel">본인 확인...</h2>
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

                            <input className="w3-btn  btnMargin btnBorderBottom" type ="button" value="포스트 삭제하기"
                                    disabled={this.state.adminPageBtn} onClick={ ()=>this.deletePost(close) }> 
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
export default PostDeletePwChecker;