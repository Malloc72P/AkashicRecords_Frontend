import React, { Component } from 'react';
import LoginPanel from './../popupComponent/mgrAccount/LoginPanel';
import RegisterPanel from './../popupComponent/mgrAccount/RegisterPanel';

class AkashicSidebar extends Component{

    constructor(props){
        super(props);
        this.toggleSidebar  =   this.toggleSidebar.bind(this);
    }
    toggleSidebar() {
        this.props.toggleSidebar();
    }
    render(){
        console.log(this.props.openerStat);
        const sideBarStyle	=	{
			right	: 0,
			display	: this.props.openerStat
		}
        return (
            <div id="akashicSideBar" class="main-sidebar w3-sidebar w3-bar-block w3-card w3-animate-right" style={sideBarStyle}>
                <div id="id_div_notLoggedIn_sidebar "href="#">
                    <h3 className="chk-side-on w3-bar-item w3-button" onClick={this.toggleSidebar}>Close</h3>
                    <LoginPanel></LoginPanel>
                    <RegisterPanel></RegisterPanel>
                </div>
            </div>
        );
    }
}
export default AkashicSidebar;