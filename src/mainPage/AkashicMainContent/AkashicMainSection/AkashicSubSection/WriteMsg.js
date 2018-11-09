import	React, { Component } 	from	'react';
import	axios 					from	'axios';
import Popup from "reactjs-popup";
import	myUtil 					from	'./../../../../util/myUtil'
import	{Redirect}				from	'react-router-dom';

class WriteMsg extends Component{

	constructor(props){
		super(props);
		this.state	=	{
			msgContent	:	""
		}
		console.log("WritePostPage.constructor >>> 메서드 호출됨");
		this.submitMsg	=	this.submitMsg.bind(this);
		this.setMsgContent	=	this.setMsgContent.bind(this);
		this.goBack			=	this.goBack.bind(this);
	}
	setMsgContent(e){
		this.setState({
			msgContent	:	e.target.value
		})
	}
	goBack(){
		this.props.history.goBack();
	}
	submitMsg = (close) =>{
		var _ssnId		=	localStorage.getItem("ssnId");
		console.log(" writeMsg >>> _ssnId : ",_ssnId);

		axios.get( new myUtil().serverUrl+"guestBookProc.do", {
			params	:	{
				ssnId			:	_ssnId,
				gbMsg			:	this.state.msgContent
			}
		})
        .then( (response)=>{
			   console.log("writeMsg >>> response : ",response.data);
			   if(response.data.insertChecker === "true"){
					alert("저장되었습니다");
					close();
					// 여기서 리다이렉트 기능을 추가해야해
			   }
			   else if(response.data.insertChecker === "sessionInvalid"){
				   alert("세션이 만료되었습니다. 로그인해주시기 바랍니다.");
				   
				   close();
			   }
			   else{
				   alert("저장에 실패하였습니다");
			   }
        })
        .catch( (error)=>{
			console.log("writeMsg >>> error : ",error);
			alert("저장에 실패하였습니다");
        })

	}
	render(){
		var	boldText	=	{
			fontWeight	:	"bold"
		}
		var popupOverider	=	{
			display	: 	"block",
			zIndex	:	600
		}
		console.log("writeMsg >>> adminPageBtn : ",this.props.adminPageBtn );
		return (
			
			<Popup 	trigger={ 
							<button className="w3-right w3-bar-item w3-button w3-mobile">
									<h5>방명록 작성</h5>
							</button>	
							} 
					modal closeOnDocumentClick>
					{close => (
						<div	className="w3-white w3-card-4 w3-display-middle boxShadow-lite popUp" 
								style={popupOverider} >

							<div className="w3-container w3-bar w3-white">
								<h2 className="w3-bar-item">방명록 작성하기...</h2>
							</div>
							<div className="w3-container  w3-white" style={{marginTop: "-1px"}}>
								<hr className="w3-black"/>
							</div>
							
							<form className="w3-container" method="post">
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
									onClick={()=>this.submitMsg(close)}/>
								
								<input className="w3-btn w3-white btnBorderBottom"
									type ="button"  value="닫기"
									onClick={ close }/>
								<br/>
								<br/>
							</form>
						</div>
					)
				}
			</Popup>
			
		)
	}
}
export default WriteMsg;
