import	React, { Component }	from	'react';
import	axios					from    "axios";
import	myUtil					from 	'./../../../../util/myUtil';
import	{ List }				from	'immutable';
import	{ Link }				from	'react-router-dom';
import	Hotkeys 				from	'react-hot-keys';
import	$						from	'jquery';

import './subSectionCSS/Series.css';
class Series extends Component{

	constructor(props){
		super(props);
		this.funcIndex	=	2;
		this.state	=	{
			hideDelBtn		:	"none",
			seriesCount		:	0,
			seriesKeyIndex	:	0,
			seriesListKey	:	new List(),
			seriesList		:	new List( )
		}
		console.log("Series.constructor >>> 메서드 호출됨");
		this.props.setCurrSec(this.funcIndex);
		this.seriesRenderer		=	this.seriesRenderer.bind(this);
		this.seriesDeleter		=	this.seriesDeleter.bind(this);
		this.getSeriesList		=	this.getSeriesList.bind(this);
		this.refreshSeriesList	=	this.refreshSeriesList.bind(this);
		
		// this.onKeyDownHandler	=	this.onKeyDownHandler.bind(this);
		// this.onKeyUpHandler	=	this.onKeyUpHandler.bind(this);
		
	}
	componentWillMount(){
		this.getSeriesList();
	}
	getSeriesList(){
		axios.get( new myUtil().serverUrl+"postList.do")
        .then( (response)=>{
			   console.log("series >>> response : ",response);
				this.setState({
					seriesCount	:	response.data.seriesCount
				})

			   var tempArr	=	response.data.seriesList;
			   for(var i = 0 ; i < tempArr.length ; i++){
					console.log("series >>> temparr.item["+i+"]",tempArr[i]);
					//var tempObj	=	this.seriesRenderer( tempArr[i], this.state.seriesKeyIndex );
					this.setState({
						seriesList		:	this.state.seriesList.push( tempArr[i] )
					})
			   }
			   
        })
        .catch( (error)=>{
            console.log("error : ",error);
        })
	}
	refreshSeriesList(){
		var _tempListSize	=	this.state.seriesList.size;
		for(var index = 0 ; index < _tempListSize ; index++){
			console.log("msgDelete >>> ["+index+"]");
			this.setState({
				seriesList		: 	this.state.seriesList.filter( 	  (_, i) => i === index )
			})	
		}
		
		this.setState({
			seriesCount		:	0,
			seriesKeyIndex	:	0,
		})
		this.getSeriesList();
	}
	componentWillUnmount(){
		console.log("Series.componentWillUnmount >>> 메서드 호출됨");
	}

	seriesRenderer(series, key){
		
		return	(
			<div className="postList-Wrapper" key={key}>
				<div className="postList w3-container w3-pannel w3-leftbar custom-w3-card">
					<img 	className="postList-img postList-img1 imgRanderer cl_img_post_thumbnail" 
							src={series.imgUrl}
							alt="seriesThumbnail"/>
					<img className="postList-img postList-img2 imgRanderer cl_img_post_thumbnail" 
							src={series.imgUrl}
							alt="seriesThumbnail"/>
					<img className="postList-img postList-img3 imgRanderer cl_img_post_thumbnail" 
							src={series.imgUrl}
							alt="seriesThumbnail"/>
					
					<div className="postList-text">
						<div className="postList-text-title" style={{fontSize: "20px"}}>
							{series.title}
						</div>
						<div className="postList-text-article w3-small w3-opacity">
							게시글 : {series.postCount}개
							<span className="textDivider">|</span>
							조회수 : {series.viewCount}회
						</div>
						<div className="postList-text-article w3-small w3-opacity">
							{series.regDate}
						</div>
					</div>
					<div 	className="postList-deleters" 
							onClick={ ()=>this.seriesDeleter(series.seriesId) }
							style={{ display: this.state.hideDelBtn }}>
						<i style={{fontSize : "36px", padding : 0}}class="im im-x-mark-circle"></i>
					</div>
				</div>
			</div>
		);
	}
	onKeyDownHandler(keyName, e, handle){
		console.log("key downed");
		console.log("series onKeyDown >>> e : ",e);
		this.setState({
			hideDelBtn	:	"block"
		})
	}
	onKeyUpHandler(keyName, e, handle){
		console.log("key upped");
		console.log("series onKeyUpHandler >>> e : ",e);
		this.setState({
			hideDelBtn	:	"none"
		})
	}
	seriesDeleter(seriesId){
		console.log("series.seriesDeleter >>> 메서드 호출됨, \n seriesID : "+seriesId);
		$.ajax(
			{
				url		:	new myUtil().serverUrl+"deleteSeries.do",
				data	:	{
					ssnId		:	localStorage.ssnId,
					seriesId	:	seriesId
				},
				method	:	"post",
				success	:	(result) => {
					console.log("series.seriesDeleter >>> AJAX수신완료");
					var jsonRes	=	JSON.parse(result);
					console.log("series.seriesDeleter >>> result : ",jsonRes);
					if(jsonRes.deleteChecker === "true"){
						this.refreshSeriesList();
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
					else{
						alert("에러가 발생했습니다.");
					}
				}
			}
		)
	}
	render(){
		console.log("series >>> render() ",this.state.seriesList);
		for(var i = 0 ; i < this.state.seriesList.size ; i++){
			console.log("series >>> render() specific seriesList["+i+"]'s Item",this.state.seriesList.get(i));
		}
		if( this.state.seriesCount <= 0 ){
			return (
				<table border="1" width="700" cellPadding="0" cellSpacing="0" align="center">
					<tbody>
						<tr>
							<td align="center">블로그에 시리즈가 존재하지 않습니다.</td>
						</tr>
					</tbody>
				</table>
			)
		}
		return(
			<Hotkeys
				keyName		=	"control+alt+d"
				onKeyDown	=	{this.onKeyDownHandler.bind(this)}
				onKeyUp		=	{this.onKeyUpHandler.bind(this)}
			>
				<div>
					{/* 시리즈 헤더 */}
					<div className="w3-card w3-bar" style={{marginBottom: "40px"}} >
						<div className="w3-bar-item">
							<h5>{/* ${ seriesCount }  */}시리즈</h5>
						</div>
						<Link 	to="/mainPage/writeSeries"
								className="w3-right w3-bar-item w3-button w3-mobile" href="#">
							<h5>시리즈 추가</h5>
						</Link>
					</div>
					
					{/* 시리즈 컨텐츠 */}
					{this.state.seriesList.map(( item, i )=>{
						return this.seriesRenderer( item, i );
					} )}
					
				</div>
			</Hotkeys>
			
		);
	}
}
export default Series;
