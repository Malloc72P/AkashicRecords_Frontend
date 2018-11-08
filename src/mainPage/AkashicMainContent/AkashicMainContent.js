import	React, { Component } 	from 'react';

import	AkashicIndexPage		from	'./AkashicIndexPage';
import	ViewPostPage			from	'./AkashicMainSection/AkashicSubSection/ViewPostPage';

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
						<Route 
							exact path		=	"/" 
							component		=	{AkashicIndexPage}
						/>
						<Route 
							exact path		=	"/mainPage/profile" 
							component		=	{AkashicIndexPage}
						/>
						<Route 
							exact path		=	"/mainPage/recentPost" 
							component		=	{AkashicIndexPage}
						/>
						<Route 
							exact path		=	"/mainPage/series" 
							component		=	{AkashicIndexPage}
						/>
						<Route 
							exact path		=	"/mainPage/guestBook" 
							component		=	{AkashicIndexPage}
						/>
						<Route	path 		=   "/viewPost"
								component	=	{ViewPostPage}
						/>
						<Route	path 		=   "/mainPage/viewPost/:pageId"
								component	=	{ViewPostPage}
						/>
					</div>
				</BrowserRouter>
				
				
			</div>
		);
	}
}
export default AkashicMainContent;
