import React, { Component } from 'react';

class MainSidebarOpener extends Component{

    constructor(props){
        super(props);
        console.log("SidebarOpener.Constructor >>> 메서드 호출됨");
    }

    render(){
        var sidebarOpener = (
			<h3 className="chk-side-on" ><i className="chk-side-on im im-key"></i></h3>
		);
		if(this.props.loginChecker === "true"){
            var profileImgStyle = {
                width   : 54,
                height  : 54,
                borderRadius    :   "50%",
                padding : 0
            }
			sidebarOpener =(
                // <h3 className="chk-side-on w3-bar-item">{this.props.email}</h3>
                <img    style={profileImgStyle}
                        className="chk-side-on w3-bar-item" 
                        src={localStorage.profileImg} alt="userProfileImg" />
			);
		}
        return(
            <div className="chk-side-on m_mgr_account">
                <button id="id_btn_keyOpener_sidebar" className="chk-side-on w3-bar-item w3-right w3-button c_sidebar_toggle_key" onClick={this.props.toggleSidebar}>
                    {/* <h3 className="chk-side-on" ><i className="chk-side-on im im-key"></i></h3> */}
                    {sidebarOpener}
                </button>
            </div>
        );
    }

}
export default MainSidebarOpener;