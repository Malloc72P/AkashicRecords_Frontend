import	React, { Component } 	from	'react';
import	axios 					from	'axios';
import	myUtil 					from	'./../../../../util/myUtil'
import	{Editor}				from	'@tinymce/tinymce-react';

class WritePostPage extends Component{

	constructor(props){
		super(props);
		
		this.state	=	{
			title		:	"",
			contentVal	:	"",
			seriesId		:	0,
			editorMap	:	new Map( )
		}
		console.log("WritePostPage.constructor >>> 메서드 호출됨");
		this.setContentVal	=	this.setContentVal.bind(this);
		this.setSeriesId	=	this.setSeriesId.bind(this);
		this.setEditorObj	=	this.setEditorObj.bind(this);
		this.setTitle		=	this.setTitle.bind(this);
		this.goBack			=	this.goBack.bind(this);
		this.submitPost		=	this.submitPost.bind(this);
	}
	componentWillMount(){
		var editorJSX =  (
			<Editor		
						initialValue	=	"당신의 이야기를 작성해주세요"
						apiKey			=	"n3qgxuzmb0qsl7vkc0n1wvbe4l2dys01jth56fio4zvc62xs"
						onChange		=	{ this.setContentVal }
						init			=	{{
							plugins: "image code fullscreen",
							toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | code | fullscreen | myButton",
							image_advtab: true,
							setup: function (editor) {
									editor.addButton('myButton', {
										text: '파일 업로드',
										icon: false,
										onclick: function () {
											//window.open('imageUploader.do','_fileupload','width=800, height=600');
											var url 	=	new myUtil().serverUrl+"imageUploader.do";
											var title	=	"이미지 업로드";
											var uploaderForm	=	document.createElement("form");

											window.open("",title,"width=800, height=600");

											uploaderForm.setAttribute("target",title);
											uploaderForm.setAttribute("charset","UTF-8");
											uploaderForm.setAttribute("method","post");
											uploaderForm.setAttribute("action",url);

											document.body.appendChild(uploaderForm);
											uploaderForm.submit();
										}
									});
									
									window.onmessage    =   (e) => {
										console.log("e.data : ",e.data);
										console.log("writePost.imgReciver >>> editorObj : ",editor);
										editor.execCommand('mceInsertContent',false,e.data);
									}
								}//setupFunction
						}}
					>
					</Editor>
		);
		this.setState({
			editorMap : this.state.editorMap.set( "editorJSX", editorJSX ),	
		})
	}
	setEditorObj( editorObj ){
		this.setState({
			editorMap : this.state.editorMap.set( "editorObj", editorObj )
		})
	}
	setContentVal(event){
		console.log("writePost >>> content : ",event.target.getContent());
		//event.target.execCommand('mceInsertContent',false,"<div>asdf</div>");
		this.setState({
			contentVal	:	event.target.getContent()
		});
	}
	setSeriesId(event){
		this.setState({
			seriesId	:	event.target.value
		});
	}
	setTitle(event){
		this.setState({
			title	:	event.target.value
		});
	}
	goBack(){
		this.props.history.goBack();
	}
	submitPost(){
		var _ssnId		=	localStorage.getItem("ssnId");
		console.log(" writePost >>> _ssnId : ",_ssnId);
		console.log(" writePost >>> this.state.title : ",this.state.title);
		console.log(" writePost >>> this.state.seriesId : ",this.state.seriesId);
		console.log(" writePost >>> this.state.contentVal : ",this.state.contentVal);

		axios.get( new myUtil().serverUrl+"writePostProc.do", {
			params	:	{
				ssnId			:	_ssnId,
				post_title		:	this.state.title,
				post_content	:	this.state.contentVal,
				series_id		:	this.state.seriesId
			}
		})
        .then( (response)=>{
			   console.log("writePost >>> response : ",response.data);
        })
        .catch( (error)=>{
            console.log("writePost >>> error : ",error);
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
					<h2 className="w3-bar-item">포스트 작성하기...</h2>
				</div>
				<div className="w3-container  w3-white" style={{marginTop: "-1px"}}>
					<hr className="w3-black"/>
				</div>
				
				<form className="w3-container" method="post">
					<br/>
					<label className="" style={boldText}>시리즈</label>
					<select value		=	{this.state.seriesId} 
							onChange	=	{this.setSeriesId}
							className	=	"w3-select w3-border w3-round-large"
							type		=	"text">
						<option value="0" disabled >포스트가 등록될 시리즈를 선택해 주세요</option>
						<option value="1">일상</option>
						<option value="2">음식</option>
						<option value="3">ICT</option>
						<option value="4">게임</option>
					</select>
					<br/>
					<br/>
					<label className="" style={boldText}>제목</label>
					<input  
							onChange	=	{this.setTitle}
							className	=	"w3-input w3-border w3-round-large" type="text"/>
					<br/>
					<label className="" style={boldText}>내용</label>
						{this.state.editorMap.get("editorJSX")}
					<br></br>
					
					<br/>
					<input 
						className="w3-btn w3-white btnMargin btnBorderBottom"
						type ="button" value="작성하기"
						onClick={this.submitPost}/>
					
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
export default WritePostPage;
