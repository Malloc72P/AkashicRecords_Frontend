import React, { Component } from 'react';
import AkashicSidebar from './AkashicSidebar/AkashicSidebar';
import './mainPage.css';
import './mainStyle/css_preset.css';
import './mainStyle/main_mediaSet.css';
import './mainStyle/myStyle.css';
import './mainStyle/subSection.css';

class MainPage extends Component {
  constructor(props){
	super(props);
	this.state	=	{
		sidebar:	{
			openerStat 	: 'none',
			sidebarMode	:	'normal',
			sidebarModeList	:	[ "admin", "user", "normal" ]
		}
	};//state
	console.log(this.state);
	this.toggleSidebar	=	this.toggleSidebar.bind(this);
	this.setSidebarMode	=	this.setSidebarMode.bind(this);
  }

  toggleSidebar(){
		console.log("MainPage.toggleSidebar >>> 메서드 호출됨");
		console.log(this.state);
		var switchData	= "";
		if(this.state.sidebar.openerStat === "none"){
			//사이드바가 닫혀있을경우
			switchData	=	"block";
		}
		else{
			//사이드바가 열려있을 경우
			switchData	=	"none";
		}
		
		this.setState({
			sidebar:	{
				openerStat : switchData,
				sidebarMode	:	this.state.sidebar.sidebarMode
			}
		})
	}
	setSidebarMode(mode){
		console.log("MainPage.setSidebarMode >>> 메서드 호출됨");
		this.setState({
			sidebar:	{
				openerStat : this.state.sidebar.openerStat,
				sidebarMode	:	mode
			}
		})
	}

  	render() {
		const hideStyle = {
			display:  "none"
		}
		const funcListWidth	=	{
			width		:	"25%"
		}
		
		const footerStyle	=	{
			textAlign: "right",
			width: "100%",
			fontWeight: "bold",
			borderTop: "1px solid #cbcbcb",
			bottom: 0
		}
		console.log(this.state);
    return (
				<div>
				{/* 아카식 메인 네비바 */}
				<div className="main-navibar w3-bar">
					<a href="/" className="w3-bar-item" style={{textDecoration: "none"}}>
						<h3>Akashic Records Mk.52</h3>
					</a>
					
					<div className="chk-side-on m_mgr_account">
							<button id="id_btn_keyOpener_sidebar" className="chk-side-on w3-bar-item w3-right w3-button c_sidebar_toggle_key" onClick={this.toggleSidebar}>
								<h3 className="chk-side-on" ><i className="chk-side-on im im-key"></i></h3>
							</button>
					</div>
				</div>
				{/* 아카식 사이드바 */}
				<AkashicSidebar openerStat		=	{this.state.sidebar.openerStat} 
								sidebarMode		=	{this.state.sidebar.sidebarMode}
								toggleSidebar	=	{this.toggleSidebar} 
								setSidebarMode	=	{this.setSidebarMode}>
				</AkashicSidebar>


				{/* 아카식 메인 컨텐츠 */}
				<div id="id_div_mainContent" className="cl_div_mainContent boxShadow-lite">

					<div className="imgRanderer banner-img w3-sepia">
						<div className="profile-img imgRanderer w3-normal" style={hideStyle}>
							<h4 className="profile-name">Guest</h4>
						</div>
					</div>
					
					<div className="main-section">
					
					<div id="id_div_funcList" className="func-list w3-card w3-border w3-bar">
							
							<a id="sel-1"  className="w3-bar-item w3-button func-element1 w3-mobile" href="#sel-1" style={funcListWidth} ><h4>프로필</h4></a>
							
							
							<a id="sel-2"  className="w3-bar-item w3-button func-element2 w3-mobile" href="#sel-selected" style={funcListWidth} ><h4>최신포스트</h4></a>
							
							
							<a id="sel-3"  className="w3-bar-item w3-button func-element3 w3-mobile" href="#sel-3" style={funcListWidth} ><h4>시리즈</h4></a>
							
							
							<a id="sel-4"  className="w3-bar-item w3-button func-element4 w3-mobile" href="#sel-4" style={funcListWidth} ><h4>방명록</h4></a>
										
					</div>
					
					<div id="id_div_subSection" className="sub-section" style={ {marginBottom: 80} }>
						
					</div>
					
					<form id="id_form_tempData" name="form_tempData">
						<input id="id_tempData_in_pageNum"  type="hidden" value="1"></input>
						<input id="id_tempData_gb_pageNum"  type="hidden" value="1"></input>
					</form>
					
				
					</div>
					
					

				</div>

					<div style={ {marginBottom: 193} }></div>
					<div className="w3-bar " style={footerStyle}>
						<h3 className="w3-bar-item w3-right">Akashic Records</h3>
					</div>


				</div>
			);
  }//render
}

export default MainPage;
