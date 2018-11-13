import React, { Component } from 'react';
import './../popupOverrider.css';
import axios    from    "axios";
import myUtil  from './../../../util/myUtil';
class LogoutPanel extends Component{
    constructor(props){
        super(props);
        this.logoutProc =   this.logoutProc.bind(this);
    }
    logoutProc(){
        axios.get(new myUtil().serverUrl+"logout.do",{
            params:{
                ssnId       :   localStorage.ssnId
            }
        })
        .then( (response)=>{
           console.log("response : ",response);
            localStorage.removeItem( "ssnId" );
            this.props.setSidebarMode("false", "false");
            this.props.setLoginStatus("false", "false", "noEmail");
        })
        .catch( (error)=>{
            console.log("error : ",error);
            alert("로그아웃에 실패했습니다.");
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