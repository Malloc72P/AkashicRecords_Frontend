import	React, { Component } 	from	'react';
import	axios 					from	'axios';
import	myUtil 					from	'./../../../../util/myUtil'
import	$						from	'jquery';
class WriteSeriesPage extends Component{

	constructor(props){
		super(props);
		this.state	=	{
			validAccess	:	false,
			seriesName	:	""
		}
		console.log("WriteSeriesPage.constructor >>> 메서드 호출됨");
		this.submitSeries	=	this.submitSeries.bind(this);
		this.setSeriesName	=	this.setSeriesName.bind(this);
		this.goBack			=	this.goBack.bind(this);
	}
	componentWillMount(){
		axios.get( new myUtil().serverUrl+"writeSeries.do", {
			params	:	{
				ssnId			:	localStorage.ssnId
			}
		})
        .then( (response)=>{
			   console.log("writeSeries >>> response : ",response.data);
			   var checker	=	response.data.checker;
			   	if(checker === "validSession"){
					this.setState({
						validAccess	:	true
					})
				}
				else if(checker === "invalidSession"){
					alert("세션만료, 다시 로그인해주세요.");
					this.goBack();
				}
				else if(checker === "lowAuthorize"){
					alert("경고!, 권한이 없습니다.");
					this.goBack();
				}
				else{
					alert("에러발생.");
					this.goBack();
				}
        })
        .catch( (error)=>{
            console.log("writeSeries >>> error : ",error);
        })
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
		$.ajax( 
			{
				method : "post",
				url    : new myUtil().serverUrl+"writeSeriesProc.do",
				data   : { 
					ssnId			:	_ssnId,
					seriesTitle		:	this.state.seriesName
				},
				success : (result) => {
					console.log("writeSeries >>> response : ",result);
					var jsonRes = JSON.parse(result)
					var checker = jsonRes.insertChecker;
					console.log("writeSeries >>> checker : ",checker);
					if( checker === "true" ){
						alert("성공적으로 저장되었습니다");
						this.goBack();
					}
					else if( checker === "false" ){
						alert("저장에 실패하였습니다!");
					}
					else if( checker === "invalidSession" ){
						alert("세션이 만료되었습니다. 다시 로그인해주세요.");
						this.goBack();
					}
					else if( checker === "lowAuthorize" ){
						alert("권한이 없습니다!");
						this.goBack();
					}
					else if( checker === "noArgument" ){
						alert("모든 입력란에 작성해주세요.");
					}
					else{
						alert("에러가 발생했습니다.");
						this.goBack();
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
			width	: 	"100%",
			height	: 	"100%",
			top		: 	"50%", 
			display	: 	"block",
			zIndex	:	600
		}
		if(this.state.validAccess === true){
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
		else{
			return(
				<div></div>
			);
		}
		
	}
}
export default WriteSeriesPage;
