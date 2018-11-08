import React, { Component } from 'react';

import  AkashicFuncSelector from    './AkashicFuncSelector/AkashicFuncSelector';
import  AkashicSubSection   from    './AkashicSubSection/AkashicSubSection';

class AkashicMainSection extends Component{

	constructor(props){
        super(props);
        console.log("AkashicMainSection.constructor >>> 메서드 호출됨");
        this.state  =  {
            currSection :   1,
            rp_PageNum  :   1,
            gb_PageNum  :   1
        }
        this.setCurrSec =   this.setCurrSec.bind(this);
    }
    componentDidUpdate(){
        console.log("AkashicMainSection.componentDidUpdate >>> curr section : ",this.state.currSection);
    }
    setCurrSec(newSec){
        console.log("AkashicMainSection.setCurrSec >>> 메서드 호출됨");
        this.setState({
            currSection :   newSec
        })
    }
	render(){
        
		return(
			<div className="main-section">
                <AkashicFuncSelector
                    currSection =   {this.state.currSection}
                    setCurrSec  =   {this.setCurrSec}
                >
                </AkashicFuncSelector>
                
                <AkashicSubSection
                    setCurrSec  =   {this.setCurrSec}
                >

                </AkashicSubSection>
            </div>
		);
	}
}
export default AkashicMainSection;
