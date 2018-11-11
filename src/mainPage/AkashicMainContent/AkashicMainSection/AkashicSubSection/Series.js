import	React, { Component }	from	'react';
import	axios					from    "axios";
import	myUtil					from 	'./../../../../util/myUtil';
import	{ List }				from	'immutable';
import	{ Link }				from	'react-router-dom';
import	SeriesWritePagePwChecker		from	'./../../../popupComponent/pwChecker/SeriesWritePagePwChecker';

import './subSectionCSS/Series.css';
class Series extends Component{

	constructor(props){
		super(props);
		this.funcIndex	=	2;
		this.state	=	{
			seriesCount		:	0,
			seriesKeyIndex	:	0,
			seriesListKey	:	new List(),
			seriesList		:	new List( [] )
		}
		console.log("Series.constructor >>> 메서드 호출됨");
		this.props.setCurrSec(this.funcIndex);
		this.seriesRenderer	=	this.seriesRenderer.bind(this);
	}
	componentWillMount(){
		axios.get( new myUtil().serverUrl+"postList.do")
        .then( (response)=>{
			   console.log("series >>> response : ",response);
				this.setState({
					seriesCount	:	response.data.seriesCount
				})

			   var tempArr	=	response.data.seriesList;
			   for(var i = 0 ; i < tempArr.length ; i++){
					console.log("series >>> temparr.item["+i+"]",tempArr[i]);
					var tempObj	=	this.seriesRenderer( tempArr[i], this.state.seriesKeyIndex );
					this.setState({
						seriesListKey	:	this.state.seriesListKey.push( this.state.seriesKeyIndex ),
						seriesList		:	this.state.seriesList.push( tempObj )
					})
					this.setState({
						seriesKeyIndex	:	this.state.seriesKeyIndex + 1
					})
			   }
			   
        })
        .catch( (error)=>{
            console.log("error : ",error);
        })
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
				</div>
			</div>
		);
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
				{this.state.seriesList}
				
			</div>
		);
	}
}
export default Series;
