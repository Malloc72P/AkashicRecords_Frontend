import  React, { Component } from 'react';
import  {Link}    from    'react-router-dom';

class AkashicFuncSelector extends Component{

	constructor(props){
		super(props);
        console.log("AkashicFuncSelector.constructor >>> 메서드 호출됨");
        this.state  = {
            fs_currSection   :   1
        }
        
        this.funcSelector   =   null;
        
        this.funcOne    =   null;
        this.funcTwo    =   null;
        this.funcThree  =   null;
        this.funcFour   =   null;
        
        
        this.selEffectDestroyer =   this.selEffectDestroyer.bind(this);
    }
    componentDidUpdate(){
        if( this.props.currSection !== this.state.fs_currSection ){
            this.selEffectDestroyer();
            var index = this.props.currSection;
            this.setState({
                fs_currSection  :   index
            })
            console.log("test",this.funcSelector.childNodes);
            console.log("test",this.funcSelector.childNodes[index]);
            this.funcSelector.childNodes[index].classList.add("w3-teal");
        }       
    }
    // selectOne(){
    //     this.props.setCurrSec(1);
    //     this.selEffectDestroyer();
    //     console.log("select One >>> ",this.funcOne);
    //     this.funcOne.classList.add("w3-teal");
    // }
    selEffectDestroyer(){
       var funcList =   this.funcSelector.childNodes;
       for(var i = 0 ; i < funcList.length; i++){
            funcList[i].classList.remove("w3-teal");
       }
    }
    selEffectGenerator(){

    }
	render(){
        const funcListWidth	=	{
			width		:	"25%"
        }
        
		return(
			<div id="id_div_funcSelector" className="func-list w3-card w3-border w3-bar"
                    ref={
                        ref => {
                            this.funcSelector   =   ref;
                        }
                    }
            >
                    <Link 
                        className="w3-bar-item w3-button func-element1 w3-mobile" 
                        style={funcListWidth}
                        to="/mainPage/profile"
                    >
                        <h4>프로필</h4>
                    </Link>
                    
                    <Link 
                        className="w3-bar-item w3-button func-element1 w3-mobile w3-teal" 
                        style={funcListWidth}
                        to="/mainPage/recentPost"
                    >
                        <h4>최신포스트</h4>
                    </Link>

                    <Link 
                        className="w3-bar-item w3-button func-element1 w3-mobile" 
                        style={funcListWidth}
                        to="/mainPage/series"
                    >
                        <h4>시리즈</h4>
                    </Link>

                    <Link 
                        className="w3-bar-item w3-button func-element1 w3-mobile" 
                        style={funcListWidth}
                        to="/mainPage/guestBook"
                    >
                        <h4>방명록</h4>
                    </Link>
            </div>
		);
	}
}
export default AkashicFuncSelector;
