import React, { Component } from 'react';
import	axios					from    "axios";
import	myUtil					from 	'./../../../../util/myUtil';
import	{ List }				from	'immutable';

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
	}
	componentWillMount(){
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
					var tempObj	=	this.msgRenderer( tempArr[i], this.state.msgKeyIndex );
					this.setState({
						msgKeyList	:	this.state.msgKeyList.push( this.state.msgKeyIndex ),
						msgList		:	this.state.msgList.push( tempObj )
					})
					this.setState({
						msgKeyIndex	:	this.state.msgKeyIndex + 1
					})
				 }
				
        })
        .catch( (error)=>{
            console.log("error : ",error);
        })
	}
	componentWillUnmount(){
		console.log("GuestBook.componentWillUnmount >>> 메서드 호출됨");
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
					var tempObj	=	this.msgRenderer( tempArr[i], this.state.msgKeyIndex );
					this.setState({
						msgKeyList	:	this.state.msgKeyList.push( this.state.msgKeyIndex ),
						msgList		:	this.state.msgList.push( tempObj )
					})
					this.setState({
						msgKeyIndex	:	this.state.msgKeyIndex + 1
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
		else if( this.state.currentPage === this.state.pageCount ){
			console.log("msgAppender >>> else if( currentPage == pageCount )")
		}
		else{
			console.log("else")
			console.log("포스트를 가져오는 과정에서 에러가 발생했습니다.")
		}
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
								<p className="w3-small"> {msg.regDate} </p>
							</div>
							<div	 
									className="guestBookUserReply">
								<i 	className="im im-plus-circle guestBookUserReply_icon" 
									title={msg.user_msgId}></i>
							</div>
						</div>
					</div>
					{
						this.replyMsgRenderer(msg.user_replyData)
					}
					{/* <c:if test="${ guestMsg.getGb_from_admin_id() != -1 }"> */}

				</div>
			
		);
	}
	replyMsgRenderer(msg){
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
					<button className="w3-right w3-bar-item w3-button w3-mobile" href="#">
						<h5>방명록 작성</h5>
					</button>
				</div>
				<div className="guestBookFullWrapper" >

				</div>
				{/* 아카식 방명록 컴포넌트 */}
				{this.state.msgList}
				
				{/* 아카식 메세지 어펜더 */}
				{this.msgAppender()}


			</div>
		);
	}
}
export default GuestBook;
