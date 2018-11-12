import	React, { Component }		from 'react';
import	axios						from    "axios";
import	myUtil						from 	'./../../../../util/myUtil';
import	{ List }					from	'immutable';
import  {Link}    					from    'react-router-dom';
class RecentPosts extends Component{

	constructor(props){
		super(props);
		this.funcIndex	=	1;
		this.state	=	{
			pageNum		:	1,
			postCount	:	0,
			pageCount	:	1,
			currentPage	:	1,
			articleKeyIndex		:	0,
			articleKeyList		:	new List(),
			articleList			:	new List([])
		}
		console.log("RecentPosts.constructor >>> 메서드 호출됨");
		this.props.setCurrSec(this.funcIndex);
		this.articleRenderer	=	this.articleRenderer.bind(this);
		this.getMoreArticle		=	this.getMoreArticle.bind(this);
		
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
				currentPage	:	this.state.pageNum,
				pageNum		:	temp+1,
				postCount	:	response.data.count,
				pageCount	:	response.data.pageCount
			})
			console.log("article List : ",response.data.articleList);
			var tempArr	=	response.data.articleList;
			console.log("tempArr : ",tempArr);
			for(var i = 0 ; i < tempArr.length ; i++){
				console.log("tempArr["+i+"] : ",tempArr[i]);
				var renderedArticle	=	this.articleRenderer( tempArr[i], this.state.articleKeyIndex );
				
				this.setState({
					articleKeyList	:	this.state.articleKeyList.push( this.state.articleKeyIndex ),
					articleList		:	this.state.articleList.push( renderedArticle )
				})
				this.setState({
					articleKeyIndex	:	this.state.articleKeyIndex + 1
				})
			}
        })
        .catch( (error)=>{
            console.log("error : ",error);
        })
	}
	getMoreArticle(){
		console.log( "RecentPosts.getMoreArticle >>> 메서드 호출됨" );
		axios.get( new myUtil().serverUrl+"recentPosts.do",{
			params	:	{
				pageNum	:	this.state.pageNum
			}
		})
        .then( (response)=>{
		   	console.log("response : ",response);
			var temp	=	this.state.pageNum;
			this.setState({
				currentPage	:	this.state.pageNum,
				pageNum		:	temp+1,
				postCount	:	response.data.count,
				pageCount	:	response.data.pageCount
			})
			console.log("article List : ",response.data.articleList);
			var tempArr	=	response.data.articleList;
			console.log("tempArr : ",tempArr);
			for(var i = 0 ; i < tempArr.length ; i++){
				console.log("tempArr["+i+"] : ",tempArr[i]);
				var renderedArticle	=	this.articleRenderer( tempArr[i], this.state.articleKeyIndex );
				
				this.setState({
					articleKeyList	:	this.state.articleKeyList.push( this.state.articleKeyIndex ),
					articleList		:	this.state.articleList.push( renderedArticle )
				})
				this.setState({
					articleKeyIndex	:	this.state.articleKeyIndex + 1
				})
			}
        })
        .catch( (error)=>{
            console.log("error : ",error);
        })
	}
	articleRenderer(article, key){

		return (
			<div key={key} className="post-wrapper w3-container post-body w3-pannel w3-leftbar ">
				
				<div className="post-content custom-w3-card">
					<div className="post-text-area">
						<div className="post-header w3-xlarge">
							<p className="w3-large post-title" style={{padding: "5px 5px 5px 15px"}}>
								<Link to={"/mainPage/viewPost/"+article.post_id} style={{textDecoration: "none"}}>
									{article.post_title}
								</Link>
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
	articleAppender(){
		if( this.state.currentPage < this.state.pageCount ){
			console.log("articleAppender >>> if( currentPage < pageCount )")
			return (
				<div className="w3-card w3-middle w3-button" style={{width: "100%"}}
																		onClick={this.getMoreArticle}>
			   		<h4>다음페이지</h4>
			   	</div>
			)  
		}
		else if( this.state.currentPage === this.state.pageCount ){
			console.log("articleAppender >>> else if( currentPage == pageCount )")
		}
		else{
			console.log("else")
			console.log("포스트를 가져오는 과정에서 에러가 발생했습니다.")
		}
	}
	
	componentWillUnmount(){
		console.log("articleAppender >>> RecentPosts.componentWillUnmount >>> 메서드 호출됨");
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
						<h5>{this.state.postCount} 포스트</h5>
					</div>
					
					<Link 	to="/mainPage/writePost"
							className="w3-right w3-bar-item w3-button w3-mobile" >
						<h5>글쓰기</h5>
					</Link>
					
				</div>

				{/* forEach */}
				{this.state.articleList}
				{/* foreach */}

				{/* 아카식 포스트 어펜더 */}
				{this.articleAppender()}
					
			</div>
		);
	}
}
export default RecentPosts;
