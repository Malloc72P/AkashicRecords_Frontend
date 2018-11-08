import React, { Component } from 'react';

class AkashicMainBanner extends Component{

	constructor(props){
		super(props);
		console.log("MyPagePanel.constructor >>> 메서드 호출됨");
	}
	render(){
        
		return(
			<div className="imgRanderer banner-img w3-sepia">
                
            </div>
		);
	}
}
export default AkashicMainBanner;
