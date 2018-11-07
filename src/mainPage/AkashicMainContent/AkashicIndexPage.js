import	React, { Component } from 'react';

import	AkashicMainBanner	from	'./AkashicMainBanner/AkashicMainBanner';
import	AkashicMainSection	from	'./AkashicMainSection/AkashicMainSection';
class AkashicIndexPage extends Component{

	constructor(props){
		super(props);
		console.log("AkashicMainContent.constructor >>> 메서드 호출됨");
	}
	render(){
		return(
			<div className="cl_div_mainContent boxShadow-lite">

				{/* 아카식 메인 배너 */}
				<AkashicMainBanner>

				</AkashicMainBanner>
				
				{/* 아카식 메인 섹션 */}
				<AkashicMainSection>
					
				</AkashicMainSection>
				
			</div>
		);
	}
}
export default AkashicIndexPage;
