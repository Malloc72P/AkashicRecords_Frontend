import  React, { Component }    from    'react';
import  {
            LoginPanel 
            ,LogoutPanel
            ,RegisterPanel
        }                       from    "./../popupComponent/mgrAccount/MgrPanel"
import  MyPagePwChecker         from    '../popupComponent/pwChecker/MyPagePwChecker';
import  AdminPagePwChecker      from    './../popupComponent/pwChecker/AdminPagePwChecker';
class AkashicSidebar extends Component{
    /* ###사이드바 이니셜라이저### */
    constructor(props){
        super(props);
        this.toggleSidebar  =   this.toggleSidebar.bind(this);
    }
    /* ###### */

    toggleSidebar() {
        this.props.toggleSidebar();
    }
    /* ###아카식 사이드바 모드### */
    AdminSidebar =  (
        <span>
            <LogoutPanel    setSidebarMode	=	{this.props.setSidebarMode}
                            toggleSidebar   =   {this.props.toggleSidebar}
                            setLoginStatus  =   {this.props.setLoginStatus}
            />
            <MyPagePwChecker    toggleSidebar   =   {this.props.toggleSidebar}
            >
            </MyPagePwChecker>
            <AdminPagePwChecker toggleSidebar   =   {this.props.toggleSidebar}
            >
            </AdminPagePwChecker>
        </span>
    );
    UserSidebar =   (
        <span>
            <LogoutPanel    setSidebarMode	=	{this.props.setSidebarMode}
                            toggleSidebar   =   {this.props.toggleSidebar}
                            setLoginStatus  =   {this.props.setLoginStatus}
            />
            <MyPagePwChecker    toggleSidebar   =   {this.props.toggleSidebar}
            >
            </MyPagePwChecker>
        </span>
    );
    NormalSidebar = (
        <span>
            <LoginPanel     setSidebarMode	=	{this.props.setSidebarMode}
                            toggleSidebar   =   {this.props.toggleSidebar}
                            setLoginStatus  =   {this.props.setLoginStatus}
            >
            </LoginPanel>
            <RegisterPanel  toggleSidebar   =   {this.props.toggleSidebar}
            >
            </RegisterPanel>
        </span>
        
    );
    /* ###### */

    render(){
        console.log(this.props.openerStat);
        const sideBarStyle	=	{
			right	: 0,
			display	: this.props.openerStat
        }
        //sidebarModeList	:	[ "admin", "user", "normal" ]
        var sidebarElement  =   {};
        sidebarElement  =   this.NormalSidebar;
        if(this.props.sidebarMode === "admin"){
            sidebarElement  =   this.AdminSidebar;
        }
        else if(this.props.sidebarMode === "user"){
            sidebarElement  =   this.UserSidebar;
        }
        else if(this.props.sidebarMode === "normal"){
            sidebarElement  =   this.NormalSidebar;
        }

        return (
            <div id="akashicSideBar" className="main-sidebar w3-sidebar w3-bar-block w3-card w3-animate-right" style={sideBarStyle}>
                <div id="id_div_notLoggedIn_sidebar "href="#">
                    <h3 className="chk-side-on w3-bar-item w3-button" onClick={this.toggleSidebar}>Close</h3>
                    {sidebarElement}
                </div>
            </div>
        );
    }
}
export default AkashicSidebar;