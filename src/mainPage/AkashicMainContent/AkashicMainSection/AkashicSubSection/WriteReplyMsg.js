import	React, { Component } 	from	'react';
import 	Popup from "reactjs-popup";
import	myUtil 					from	'./../../../../util/myUtil';
import	$						from	'jquery';
class WriteReplyMsg extends Component{

	constructor(props){
		super(props);
		this.state	=	{
			msgContent	:	""
		}
		console.log("WritePostPage.constructor >>> 메서드 호출됨");
		this.submitMsg		=	this.submitMsg.bind(this);
		this.setMsgContent	=	this.setMsgContent.bind(this);
	}
	
	setMsgContent(e){
		this.setState({
			msgContent	:	e.target.value
		})
	}
	
	submitMsg = (close, historyMgr) =>{
		var _ssnId		=	localStorage.getItem("ssnId");
		console.log(" writeMsg >>> _ssnId : ",_ssnId);
		$.ajax( 
			{
				method : "post",
				url    : new myUtil().serverUrl+"guestBookReplyProc.do",
				data   : { 
					ssnId			:	_ssnId,
					gbReplyMsg		:	this.state.msgContent,
					gbReplyMsg_id	:	this.props.user_msgId
				},
				success : (result) => {
					console.log("writeMsg >>> response : ",result);
					var jsonRes = JSON.parse(result)
					var checker = jsonRes.insertChecker;
					console.log("writeMsg >>> checker : ",checker);
					if(checker === "true"){
						alert("저장되었습니다");
						this.props.refreshPage();
						close();
					}
					else if(checker === "false"){
						alert("저장에 실패하였습니다.");
						close();
					}
					else if(checker === "invalidSession"){
						alert("세션이 만료되었습니다. 로그인해주시기 바랍니다.");
						close();
					}
					else if(checker === "lowAuthorize"){
						alert("권한이 부족합니다.");
						close();
					}
					else if(checker === "noArgument"){
						alert("모든 입력란에 입력하주시기바랍니다.");
						close();
					}
					else{
						alert("저장에 실패하였습니다");
					}
				}//success()
			}//ajax {}
		)//.ajax()
	}
	
	render(){
		var	boldText	=	{
			fontWeight	:	"bold"
		}
		var popupOverider	=	{
			display	: 	"block",
			zIndex	:	600
		}
		
		return (
			
			<Popup 	trigger={ 
								<div	className	=	"guestBookUserReply">
									<i 	className="im im-plus-circle guestBookUserReply_icon" 
										title={this.props.user_msgId}
									>
									</i>
								</div>
							} 
					modal closeOnDocumentClick>
					{close => (
						<div	className="w3-white w3-card-4 w3-display-middle boxShadow-lite popUp" 
								style={popupOverider} >

							<div className="w3-container w3-bar w3-white">
								<h2 className="w3-bar-item">방명록 답글 작성하기...</h2>
							</div>
							<div className="w3-container  w3-white" style={{marginTop: "-1px"}}>
								<hr className="w3-black"/>
							</div>
							
							<div className="w3-container" method="post">
								<br/>
								<label className="" style={boldText}>메시지를 입력해주세요</label>
								<br></br>
								<input  
										onChange	=	{this.setMsgContent}
										className	=	"w3-input w3-border w3-round-large" type="text"/>
								<br/>
								<br/>
								<input 
									className="w3-btn w3-white btnMargin btnBorderBottom"
									type ="button" value="작성하기"
									onClick={()=>this.submitMsg(close, this.historyMgr)}/>
								
								<input className="w3-btn w3-white btnBorderBottom"
									type ="button"  value="닫기"
									onClick={ close }/>
								<br/>
								<br/>
							</div>
						</div>
					)
				}
			</Popup>
			
		)
	}
}
export default WriteReplyMsg;
