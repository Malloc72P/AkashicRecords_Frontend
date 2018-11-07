import React, { Component } from 'react';
import	axios					from    "axios";
import	myUtil					from 	'./../../../../util/myUtil';
import	{ Map, List }			from	'immutable';

class RecentPosts extends Component{

	constructor(props){
		super(props);
		this.funcIndex	=	1;
		this.state	=	{
			pageNum		:	1,
			postCount	:	1,
			pageCount	:	1,
			currentPage	:	1,
			articleList			:	List([])
		}
		console.log("RecentPosts.constructor >>> 메서드 호출됨");
		if( this.props.setCurrSec != null ){
			this.props.setCurrSec(this.funcIndex);
		}
		this.articleRenderer	=	this.articleRenderer.bind(this);
	}
	componentWillMount(){
		axios.get( new myUtil().serverUrl+"recentPosts.do",{
			params	:	{
				pageNum	:	this.state.pageNum
			}
		})
        .then( (response)=>{
		   	console.log("response : ",response);
			var temp	=	this.state.pageNum;
			this.setState({
				pageNum	:	temp+1
			})
			console.log("article List : ",response.data.articleList);
			var tempArr	=	response.data.articleList;
			console.log("tempArr : ",tempArr);
			for(var i = 0 ; i < tempArr.length ; i++){
				console.log("tempArr["+i+"] : ",tempArr[i]);
				var renderedArticle	=	this.articleRenderer(tempArr[i]);
				this.setState({
					articleList	:	this.state.articleList.push( renderedArticle )
				})
			}
        })
        .catch( (error)=>{
            console.log("error : ",error);
        })
	}
	articleRenderer(article){
		return (
			<div className="post-wrapper w3-container post-body w3-pannel w3-leftbar ">
				
				<div className="post-content custom-w3-card">
					<div className="post-text-area">
						<div className="post-header w3-xlarge">
							<p className="w3-large post-title" style={{padding: "5px 5px 5px 15px"}}>
								<a href="" className="recentPostTitle">
									{article.post_title}
								</a>
							</p>
						</div>
						<div className="post-summary w3-small w3-opacity">
							<p className="w3-middle post-text" style={{padding: "5px 5px 5px 15px"}}>
								{article.post_summary}
							</p>				
						</div>
						<div className="post-footer-wrapper w3-display-bottomleft">
							<p className="post-text post-footer-date post-footer-text">{article.post_regdate}</p>
							<p className="post-text post-footer-view post-footer-text">{article.post_viewcount} 읽음</p>
						</div>
	
					</div>
					<div className="post-img-area" style={{textAlign: "center"}}>
						<img className="cl_img_post_thumbnail" alt="postThumbnailImg" src={article.Img_url}></img>
					</div>
				</div> 
			</div>
		);
	}
	componentWillUnmount(){
		console.log("RecentPosts.componentWillUnmount >>> 메서드 호출됨");
	}
	render(){
		console.log("final result : ",this.state.articleList);
		console.log("length : ",this.state.articleList.size);
		for(var i = 0 ; i < this.state.articleList.size ; i++){
			console.log("item["+i+"] : ",this.state.articleList.get(i));
		}
		if( this.state.postCount <= 0 ){
			return (
				<table border="1" width="700" cellPadding="0" cellSpacing="0" align="center">
					<tbody>
						<tr>
							<td align="center">게시판에 저장된 글이 없습니다.</td>
						</tr>
					</tbody>
				</table>
			)
		}
		return(
			<div>
				<div className="w3-card w3-bar w3-border" >
					<div className="w3-bar-item">
						<h5> 포스트</h5>
					</div>
					<div className="w3-right w3-bar-item w3-button w3-mobile" >
						<h5>글쓰기</h5>
					</div>
				</div>

				{/* forEach */}
				{this.state.articleList}
				<hr/>
				{/* foreach */}
					
			</div>
		);
	}
}
export default RecentPosts;
