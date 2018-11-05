import React, { Component } from 'react';
import './../popupOverrider.css';
import axios    from    "axios";

class LogoutPanel extends Component{
    constructor(props){
        super(props);
        this.logoutProc =   this.logoutProc.bind(this);
    }
    logoutProc(){
        axios.get("http://localhost:8090/AkashicRecords/hello/logout.do",{
            params:{
                ssnId       :   localStorage.ssnId
            }
        })
        .then( (response)=>{
           console.log("response : ",response);
            localStorage.removeItem( "ssnId" );
            this.props.setSidebarMode("false", "false");
            this.props.toggleSidebar();
        })
        .catch( (error)=>{
            console.log("error : ",error);
            alert("로그아웃에 실패했습니다.");
            this.props.toggleSidebar();
        })
    }
    render(){
        return (
            <button className="w3-bar-item w3-button"
                                                    onClick={this.logoutProc}>
            Logout
            </button>
        )
    }
}//component

export default LogoutPanel;