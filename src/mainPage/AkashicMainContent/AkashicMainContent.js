import	React, { Component } from 'react';

import	AkashicIndexPage	 from	'./AkashicIndexPage';

import	{BrowserRouter, Route}		from	'react-router-dom';

class AkashicMainContent extends Component{

	constructor(props){
		super(props);
		console.log("AkashicMainContent.constructor >>> 메서드 호출됨");
	}
	render(){
		return(
			<div className="cl_div_mainContent boxShadow-lite">
				<BrowserRouter>
					<div>
						<Route path	=	"/" component={AkashicIndexPage}/>
					</div>
				</BrowserRouter>
				
				
			</div>
		);
	}
}
export default AkashicMainContent;
