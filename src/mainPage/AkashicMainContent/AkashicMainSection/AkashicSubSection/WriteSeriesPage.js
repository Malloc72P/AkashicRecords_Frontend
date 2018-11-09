import	React, { Component } 	from	'react';
import	axios 					from	'axios';
import	myUtil 					from	'./../../../../util/myUtil'

class WriteSeriesPage extends Component{

	constructor(props){
		super(props);
		this.state	=	{
			seriesName	:	""
		}
		console.log("WritePostPage.constructor >>> 메서드 호출됨");
		this.submitSeries	=	this.submitSeries.bind(this);
		this.setSeriesName	=	this.setSeriesName.bind(this);
		this.goBack			=	this.goBack.bind(this);
	}
	setSeriesName(e){
		this.setState({
			seriesName	:	e.target.value
		})
	}
	goBack(){
		this.props.history.goBack();
	}
	submitSeries(){
		var _ssnId		=	localStorage.getItem("ssnId");
		console.log(" writeSeries >>> _ssnId : ",_ssnId);

		axios.get( new myUtil().serverUrl+"writeSeriesProc.do", {
			params	:	{
				ssnId			:	_ssnId
			}
		})
        .then( (response)=>{
			   console.log("writeSeries >>> response : ",response.data);
        })
        .catch( (error)=>{
            console.log("writeSeries >>> error : ",error);
        })

	}
	render(){
		var	boldText	=	{
			fontWeight	:	"bold"
		}
		var popupOverider	=	{
			width	: 	"100%",
			height	: 	"100%",
			top		: 	"50%", 
			display	: 	"block",
			zIndex	:	600
		}
		
		return (
			<div	className="w3-white w3-card-4 w3-display-middle boxShadow-lite popUp" 
					style={popupOverider} >

				<div className="w3-container w3-bar w3-white">
					<h2 className="w3-bar-item">시리즈 작성하기...</h2>
				</div>
				<div className="w3-container  w3-white" style={{marginTop: "-1px"}}>
					<hr className="w3-black"/>
				</div>
				
				<form className="w3-container" method="post">
					<br/>
					<label className="" style={boldText}>시리즈 제목</label>
					<input  
							onChange	=	{this.setSeriesName}
							className	=	"w3-input w3-border w3-round-large" type="text"/>
					<br/>
					<br/>
					<input 
						className="w3-btn w3-white btnMargin btnBorderBottom"
						type ="button" value="작성하기"
						onClick={this.submitSeries}/>
					
					<input className="w3-btn w3-white btnBorderBottom"
						type ="button"  value="뒤로가기"
						onClick={ this.goBack }/>
					<br/>
					<br/>
				</form>
			</div>
		)
	}
}
export default WriteSeriesPage;
