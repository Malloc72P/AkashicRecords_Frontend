import  React, { Component }    from    'react';
import  {Route}                 from    'react-router-dom';

import  ProfilePage             from    './ProfilePage';
import  RecentPosts             from    './RecentPosts';
import  Series                  from    './Series';
import  GuestBook               from    './GuestBook';
class AkashicSubSection extends Component{

	constructor(props){
		super(props);
		console.log("AkashicSubSection.constructor >>> 메서드 호출됨");
	}
	render(){
		return(
			<div className="sub-section" style={ {marginBottom: 80} }>
				{/* 아카식-라우트 >>> 메인 페이지 */}
				<Route 	
					exact path	=	"/"     				
					render		=	{
						()	=>	<RecentPosts setCurrSec={this.props.setCurrSec}></RecentPosts>
					}
				/>
				
				{/* 아카식-라우트 >>> 프로필 페이지 */}
				<Route 
					path		=	"/mainPage/profile"     
					render		=	{
						()	=>	<ProfilePage setCurrSec={this.props.setCurrSec}></ProfilePage>
					}
				/>

				{/* 아카식-라우트 >>> 최신 포스트 */}
				<Route 
					path		=	"/mainPage/recentPost"  
					render		=	{
						()	=>	<RecentPosts setCurrSec={this.props.setCurrSec}></RecentPosts>
					}
				/>

				{/* 아카식-라우트 >>> 시리즈 */}
				<Route 
					path		=	"/mainPage/series"      
					render		=	{
						()	=>	<Series setCurrSec={this.props.setCurrSec}></Series>
					}
				/>

				{/* 아카식-라우트 >>> 방명록*/}
				<Route 
					path		=	"/mainPage/guestBook"   
					render		=	{
						()	=>	<GuestBook setCurrSec={this.props.setCurrSec}></GuestBook>
					}
				/>
            </div>
		);
	}
}
export default AkashicSubSection;
