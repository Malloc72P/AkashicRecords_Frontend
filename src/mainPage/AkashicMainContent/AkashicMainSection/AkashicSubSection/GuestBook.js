import React, { Component } from 'react';
import	axios					from    "axios";
import	myUtil					from 	'./../../../../util/myUtil';
import	{ List }				from	'immutable';
import 	WriteMsg 				from 	'./WriteMsg';
import	WriteReplyMsg			from	'./WriteReplyMsg';
import	$						from	'jquery';

import	'./subSectionCSS/GuestBook.css'


class GuestBook extends Component{

	constructor(props){
		super(props);
		this.funcIndex	=	3;
		this.state = {
			pageNum		:	1,
			msgCount	:	0,
			pageCount	:	1,
			currentPage	:	1,
			msgKeyIndex	:	0,
			msgKeyList	:	new List(),
			msgList		:	new List([])
		}
		console.log("GuestBook.constructor >>> 메서드 호출됨");
		this.props.setCurrSec(this.funcIndex);
		this.msgRenderer		=	this.msgRenderer.bind(this);
		this.replyMsgRenderer	=	this.replyMsgRenderer.bind(this);
		this.getMoreMsg			=	this.getMoreMsg.bind(this);
		this.refreshPage		=	this.refreshPage.bind(this);
		this.getFirstMsg		=	this.getFirstMsg.bind(this);
		this.msgDeleter			=	this.msgDeleter.bind(this);
		this.replyDeleter		=	this.replyDeleter.bind(this);
	}
	componentWillMount(){
		this.getFirstMsg();
	}
	componentWillUnmount(){
		console.log("GuestBook.componentWillUnmount >>> 메서드 호출됨");
	}
	refreshPage(){
		this.setState({
			msgList	:	new List()
		})	
		this.setState({
			pageNum		:	1,
			msgCount	:	0,
			pageCount	:	1,
			currentPage	:	1
		})
		this.getFirstMsg();
	}
	getFirstMsg(){
		axios.get( new myUtil().serverUrl+"guestBook.do")
        .then( (response)=>{
			   	console.log("GuestBook >>> response : ",response);
			   	console.log("GuestBook >>> data : ",response.data);
			   	this.setState({
					currentPage	:	this.state.pageNum,
					pageNum		:	this.state.pageNum + 1,
					msgCount	:	response.data.count,
					pageCount	:	response.data.pageCount
				})
				 var tempArr	=	response.data.msgList;
				 console.log("guestbook >>> tempArr : ",tempArr);
				 for( var i = 0 ; i < tempArr.length ; i++ ){
					// console.log("tempArr["+i+"] : ",tempArr[i]);
					this.setState({
						msgList		:	this.state.msgList.push( tempArr[i] )
					})
				 }
				
        })
        .catch( (error)=>{
            console.log("error : ",error);
        })
	}
	getMoreMsg(){
		console.log( "GuestBook.getMoreMsg >>> 메서드 호출됨" );
		axios.get( new myUtil().serverUrl+"guestBook.do",{
			params	:	{
				pageNum	:	this.state.pageNum
			}
		})
        .then( (response)=>{
			   	console.log("GuestBook >>> response : ",response);
			   	console.log("GuestBook >>> data : ",response.data);
			   	this.setState({
					currentPage	:	this.state.pageNum,
					pageNum		:	this.state.pageNum + 1,
					msgCount	:	response.data.count,
					pageCount	:	response.data.pageCount
				})
				 var tempArr	=	response.data.msgList;
				 console.log("guestbook >>> tempArr : ",tempArr);
				 for( var i = 0 ; i < tempArr.length ; i++ ){
					// console.log("tempArr["+i+"] : ",tempArr[i]);
					this.setState({
						msgList		:	this.state.msgList.push( tempArr[i] )
					})
				 }
				
        })
        .catch( (error)=>{
            console.log("error : ",error);
        })
	}
	msgAppender(){
		if( this.state.currentPage < this.state.pageCount ){
			console.log("msgAppender >>> if( currentPage < pageCount )")
			return (
				<div className="w3-card w3-middle w3-button" style={{width: "100%"}}
																		onClick={this.getMoreMsg}>
			   		<h4>다음페이지</h4>
			   	</div>
			)  
		}
		else if( this.state.currentPage == this.state.pageCount ){
			console.log("msgAppender >>> else if( currentPage == pageCount )")
		}
		else{
			console.log("else")
			console.log("메세지를 가져오는 과정에서 에러가 발생했습니다.")
			console.log("currentPage : "+this.state.currentPage);
			console.log("pageCount : "+this.state.pageCount);
		}
	}
	msgDeleter(msgId){
		console.log("series.seriesDeleter >>> 메서드 호출됨, \n msgId : "+msgId);
		$.ajax(
			{
				url		:	new myUtil().serverUrl+"deleteMsg.do",
				data	:	{
					ssnId		:	localStorage.ssnId,
					msgId		:	msgId
				},
				method	:	"post",
				success	:	(result) => {
					console.log("series.seriesDeleter >>> AJAX수신완료");
					var jsonRes	=	JSON.parse(result);
					console.log("series.seriesDeleter >>> result : ",jsonRes);
					if(jsonRes.deleteChecker === "true"){
						this.refreshPage();
					}
					else if(jsonRes.deleteChecker === "false"){
						alert("시리즈 삭제를 실패했습니다.");
					}
					else if(jsonRes.deleteChecker === "invalidSession"){
						alert("세션이 만료되었습니다. 다시 로그인해주세요");
					}
					else if(jsonRes.deleteChecker === "lowAuthorize"){
						alert("권한이 없습니다...!");
					}
					else if(jsonRes.deleteChecker === "notyou"){
						alert("자신이 작성한 메세지만 삭제할 수 있습니다");
					}
					else{
						alert("에러가 발생했습니다.");
					}
				}
			}
		)
	}
	replyDeleter(msgId, originId){
		console.log("series.replyDeleter >>> 메서드 호출됨, \n msgId : "+msgId);
		$.ajax(
			{
				url		:	new myUtil().serverUrl+"deleteAdminMsg.do",
				data	:	{
					ssnId		:	localStorage.ssnId,
					msgId		:	msgId,
					originId	:	originId
				},
				method	:	"post",
				success	:	(result) => {
					console.log("series.seriesDeleter >>> AJAX수신완료");
					var jsonRes	=	JSON.parse(result);
					console.log("series.seriesDeleter >>> result : ",jsonRes);
					if(jsonRes.deleteChecker === "true"){
						this.refreshPage();
					}
					else if(jsonRes.deleteChecker === "false"){
						alert("시리즈 삭제를 실패했습니다.");
					}
					else if(jsonRes.deleteChecker === "invalidSession"){
						alert("세션이 만료되었습니다. 다시 로그인해주세요");
					}
					else if(jsonRes.deleteChecker === "lowAuthorize"){
						alert("권한이 없습니다...!");
					}
					else if(jsonRes.deleteChecker === "notyou"){
						alert("자신이 작성한 메세지만 삭제할 수 있습니다");
					}
					else{
						alert("에러가 발생했습니다.");
					}
				}
			}
		)
	}
	msgRenderer( msg, key ){
		return (
				<div className="msgCoupler" key={key}>
					<div className="userMsgWrapper">
						<div className="userFullWrapper">
							<div className="userBalloon">
								<p className="guestBook-text w3-large"> {msg.user_content} </p>
							</div>
							<div className="userName guestBookProfileName">
								<h5> {msg.user_writerEmail} </h5>
							</div>
							<div className="userProfileImgWrapper">
								<img	className="userProfileImg" 
										src={msg.user_imgUrl}
										alt="게스트 프로필 이미지"/>
							</div>
							<div className="guestBookUserRegDate">
								<p className="w3-small"> {msg.user_regDate} </p>
							</div>
							<WriteReplyMsg
								user_msgId	= 	{msg.user_msgId}
								refreshPage	=	{this.refreshPage}
							>
							</WriteReplyMsg>
							<div	
								className	=	"guestBookUserDel"
								onClick		=	{()=>this.msgDeleter(msg.user_msgId)}
							>
								<i 	className="im im-x-mark-circle guestBookUserDel_icon" 
									title={this.props.user_msgId}
								>
								</i>
							</div>
						</div>
					</div>
					{
						this.replyMsgRenderer(msg.user_replyData, msg.user_msgId)
					}
					{/* <c:if test="${ guestMsg.getGb_from_admin_id() != -1 }"> */}

				</div>
			
		);
	}
	replyMsgRenderer(msg, originId){
		if(msg){
			return(
				<div className="adminMsgWrapper">
					<div className="adminFullWrapper">
						<div className="adminBalloon">
							<p className="guestBook_text w3-large"> {msg.admin_content} </p>
						</div>
						<div className="adminName guestBookProfileName">
							<h5> {msg.admin_writerEmail} </h5>
						</div>
						<div className="adminProfileImgWrapper">
							<img 	className="adminProfileImg" 
									src={msg.admin_imgUrl}
									alt="관리자 프로필 이미지"/>
						</div>
						<div className="guestBookAdminRegDate">
							<p className="w3-small"> {msg.admin_regDate} </p>
						</div>

						{/* 어드민 메세지 딜러터 */}
						<div	
							className	=	"guestBookAdminDel"
							onClick		=	{()=>this.replyDeleter(msg.admin_msgId, originId)}
						>
							<i 	className="im im-x-mark-circle guestBookAdminDel_icon" 
								title={this.props.user_msgId}
							>
							</i>
						</div>

					</div>
				</div>
			);
		}
	}
	
	render(){
		console.log("guestbook.render >>> this.state.msgList : ",this.state.msgList);
		for(var i = 0 ; i < this.state.msgList.size ; i++){
			console.log("item["+i+"] : ",this.state.msgList.get(i));
		}
		return(
			<div>

				<div id="id_div_guestBookHeader" className="w3-card w3-bar" style={{ marginBottom: "40px" }} >
					<div className="w3-bar-item">
						<h5>{ this.state.msgCount } 메세지</h5>
					</div>
					
					<WriteMsg 
							refreshPage={this.refreshPage}>

					</WriteMsg>
				</div>
				<div className="guestBookFullWrapper" >

				</div>
				{/* 아카식 방명록 컴포넌트 */}
				{
					this.state.msgList.map( (item, i) => {
						return this.msgRenderer( item, i );
					})
				}
				
				{/* 아카식 메세지 어펜더 */}
				{this.msgAppender()}


			</div>
		);
	}
}
export default GuestBook;
