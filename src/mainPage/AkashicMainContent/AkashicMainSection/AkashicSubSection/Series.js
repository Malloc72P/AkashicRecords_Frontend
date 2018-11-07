import React, { Component } from 'react';

class Series extends Component{

	constructor(props){
		super(props);
		this.funcIndex	=	2;
		console.log("Series.constructor >>> 메서드 호출됨");
		this.props.setCurrSec(this.funcIndex);
	}
	componentWillUnmount(){
		console.log("Series.componentWillUnmount >>> 메서드 호출됨");
	}
	render(){
		return(
			<div>
				<h1>Series</h1>
			</div>
		);
	}
}
export default Series;
