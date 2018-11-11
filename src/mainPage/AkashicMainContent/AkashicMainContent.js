import	React, { Component } 	from 'react';

import	AkashicIndexPage		from	'./AkashicIndexPage';
import	ViewPostPage			from	'./AkashicMainSection/AkashicSubSection/ViewPostPage';
import	WritePostPage			from	'./AkashicMainSection/AkashicSubSection/WritePostPage';
import	WriteSeriesPage			from	'./AkashicMainSection/AkashicSubSection/WriteSeriesPage';


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
						{/* 아카식-라우트 >>> 디폴트 페이지 상단 렌더링 라우트 */}
						<Route 
							exact path		=	"/" 
							component		=	{AkashicIndexPage}
						/>

						{/* 아카식-라우트 >>> 메뉴선택페이지 상단 렌더링용 라우트 ### */}
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
						{/* ### 아카식-라우트 >>> 메뉴선택페이지 상단 렌더링용 라우트 */}

						{/* 아카식-라우트 >>> 포스트 보기 라우트 */}
						<Route	path 		=   "/mainPage/viewPost/:pageId"
								component	=	{ViewPostPage}
						/>

						<Route	path 		=   "/mainPage/writePost"
								component	=	{WritePostPage}
						/>

						<Route	path 		=   "/mainPage/writeSeries"
								component	=	{WriteSeriesPage}
						/>


					</div>
				</BrowserRouter>
				
				
			</div>
		);
	}
}
export default AkashicMainContent;
