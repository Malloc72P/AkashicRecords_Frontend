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
				<Route 	
					exact path	=	"/"     				
					render		=	{
						()	=>	<RecentPosts setCurrSec={this.props.setCurrSec}></RecentPosts>
					}
				/>

				<Route 
					path		=	"/mainPage/profile"     
					render		=	{
						()	=>	<ProfilePage setCurrSec={this.props.setCurrSec}></ProfilePage>
					}
				/>

				<Route 
					path		=	"/mainPage/recentPost"  
					render		=	{
						()	=>	<RecentPosts setCurrSec={this.props.setCurrSec}></RecentPosts>
					}
				/>

				<Route 
					path		=	"/mainPage/series"      
					render		=	{
						()	=>	<Series setCurrSec={this.props.setCurrSec}></Series>
					}
				/>

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
