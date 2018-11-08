import	React, { Component } 	from	'react';
import	axios 					from	'axios';
import	myUtil 					from	'./../../../../util/myUtil'
import	{parse}					from	'node-html-parser';
import	'./subSectionCSS/ViewPost.css';
import	reactHtmlParser	from 'react-html-parser';


class ViewPostPage extends Component{

	constructor(props){
		super(props);
		this.state	=	{
			seriesName		:	"",
			title			:	"",
			regDate			:	"",
			viewCount		:	"",
			postContent		:	""
		}
		console.log("viewPostPage.constructor >>> 메서드 호출됨");
		
		this.inputValReturner	=	this.inputValReturner.bind(this);
	}
	componentWillMount(){
		axios.get( new myUtil().serverUrl+"viewContent.do", {
			params	:	{
				post_id	:	this.props.match.params.pageId
			}
		})
        .then( (response)=>{
			   //console.log("viewPost >>> response : ",response.data);
			   var temp = reactHtmlParser(response.data);
			   console.log("viewPost >>> temp : ",temp);
			   
			   var	title	=	this.inputValReturner( response.data, "post_title" );
			   var	regDate	=	this.inputValReturner( response.data, "post_regdate" );
			   var	viewCount	=	this.inputValReturner( response.data, "post_viewcount" );
			   var	writer	=	this.inputValReturner( response.data, "post_writer" );
			   var	seriesName	=	this.inputValReturner( response.data, "post_series" );

			   console.log("viewPost >>> data : ",title);
			   console.log("viewPost >>> data : ",regDate);
			   console.log("viewPost >>> data : ",viewCount);
			   console.log("viewPost >>> data : ",writer);
			   console.log("viewPost >>> data : ",seriesName);
				
			   this.setState({
					postContent	:	temp,
					seriesName	:	seriesName,
					title		:	title,
					regDate		:	regDate,
					viewCount	:	viewCount
			   });
        })
        .catch( (error)=>{
            console.log("error : ",error);
        })
	}
	inputValReturner( htmlString, input_id ){
		var htmlTemp	=	parse( htmlString );
		var RowData		=	htmlTemp.querySelector("#"+input_id).rawAttrs;
		var fromVal		=	RowData.indexOf( 'value="' ) + 7;
		var resultData	=	RowData.substring( fromVal, RowData.length-1 );
		console.log("viewPost.inputValReturner >>> resultData : ",resultData);

		return resultData;
	}
	render(){
		return(
				<div className="viewPostArticle" >
					<div className="viewPostHeader">
						<div className="viewPostSeries">
							시리즈 : {this.state.seriesName}
						</div>

						<div className="viewPostTitle" >
							{this.state.title}
						</div>

						<div className="viewPostWriter" >
							{this.state.writer}
						</div>

						<div className="viewPostDate" >
							작성일 : {this.state.regDate}
						</div>

						<div className="viewPostViewCount" >
							조회수 : {this.state.viewCount}
						</div>

					</div>
					<hr style={{width:"85%", margin: "0 auto", marginBottom: "30px"}} />
					<div >
						{this.state.postContent}
					</div>

					{/* post footer */}
					<div style={{ height : 100, width : "100%" }}>
						
					</div>
				</div>
		);
	}
}
export default ViewPostPage;
