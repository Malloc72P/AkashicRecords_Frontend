import React, { Component } from 'react';

class GuestBook extends Component{

	constructor(props){
		super(props);
		this.funcIndex	=	3;
		console.log("GuestBook.constructor >>> 메서드 호출됨");
		this.props.setCurrSec(this.funcIndex);
	}
	componentWillUnmount(){
		console.log("GuestBook.componentWillUnmount >>> 메서드 호출됨");
	}
	render(){
		return(
			<div>
				<h1>GuestBook Page</h1>
			</div>
		);
	}
}
export default GuestBook;
