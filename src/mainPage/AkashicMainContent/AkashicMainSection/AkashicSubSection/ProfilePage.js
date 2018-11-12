import	React, { Component } 	from 	'react';
import	axios					from    "axios";
import	myUtil					from 	'./../../../../util/myUtil';
import	'./subSectionCSS/ProfilePage.css';
class ProfilePage extends Component{

	constructor(props){
		super(props);
		this.state	=	{
			pageData	:	"<div></div>"
		}
		this.funcIndex	=	0;
		console.log("ProfilePage.constructor >>> 메서드 호출됨");
		this.props.setCurrSec(this.funcIndex);
	}
	componentWillMount(){
		axios.get( new myUtil().serverUrl+"profile.do")
        .then( (response)=>{
		   	console.log("response : ",response);
		   	console.log("response html data : ",response.data);
			
        })
        .catch( (error)=>{
            console.log("error : ",error);
        })
	}
	componentWillUnmount(){
		console.log("ProfilePage.componentWillUnmount >>> 메서드 호출됨");
	}
	render(){
		return(
			<div style={{maxWidth: "700px", minHeight: "480px"}}>
				<div className="w3-card w3-bar" style={{marginBottom: "40px"}} >
					<div className="w3-bar-item">
						<h5>AkashicRecords</h5>
					</div>
					{/* <button className="w3-right w3-bar-item w3-button w3-mobile">
						<h5>프로필 수정</h5>
					</button> */}
				</div>
				<div className="w3-leftbar cl_div_profileSection w3-white w3-card w3-container">
					<div className="w3-container cl_div_profileHeader">
						<p className="w3-medium">풀스택 개발자를 목표로 하는 잉여공대생 멀록입니다</p>
					</div>
					<div className="w3-container cl_div_profileArticle">
						<p className="w3-small">컴공 3학년 잉여공대생, 게임,영드,미드,비행기 다 좋아함.</p>
					</div>
					<div className="cl_div_profileImg imgRanderer"></div>
				</div>
				
				<hr className="cl_hr_customHR"/>
				
				<div className="w3-leftbar cl_div_profileSection w3-white w3-card w3-container">
					<div className="w3-container cl_div_profileHeader">
						<p className="w3-medium">디코ID & 이메일 주소</p>
					</div>
					<div className="w3-container cl_div_profileArticle">
						<p className="w3-small">Discord : Malloc72#1954</p>
						<p className="w3-small">E-mail  : dase1102@gmail.com</p>
					</div>
					<div className="cl_div_discordImg imgRanderer"></div>
				</div>
				
				<hr className="cl_hr_customHR"/>
				
				<div className="w3-leftbar cl_div_profileSection w3-white w3-card w3-container">
					<div className="w3-container cl_div_profileHeader">
						<p className="w3-medium">블로그 서버 세부정보</p>
					</div>
					<div className="w3-container cl_div_profileArticle">
						<p className="w3-small">CPU : Ryzen 1600 6-core processor</p>
						<p className="w3-small">Ram  : DDR4 8G</p>
						<p className="w3-small">WebServer  : Apache-Tomcat</p>
						<p className="w3-small">DB_Server  : Oracle DataBase 11G ExpressEdition</p>
						
					</div>
					<div className="cl_div_serverImg imgRanderer"></div>
				</div>
			</div>	
		);
	}
}
export default ProfilePage;
