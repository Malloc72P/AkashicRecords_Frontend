import  React, { Component }    from    'react';
import  Popup                   from    "reactjs-popup";
import  axios                   from    'axios';
import  myUtil                  from    './../../../util/myUtil'

class UserPwChecker extends Component{
    constructor(props){
        super(props);
        console.log("UserPwChecker.constructor >>> 메서드 호출됨");
    }
    render(){
        
        return(
            <Popup trigger={ this.props.triggerBtn } modal closeOnDocumentClick>
            {
                close => (
                    <div>
                        <h1>testing</h1>
                    </div>
                )
            }
            </Popup>    
        );
    }
}
export default UserPwChecker;