import	React, { Component }	from 'react';

class MainPage extends Component {
    render(){
        const footerStyle	=	{
			textAlign: "right",
			width: "100%",
			fontWeight: "bold",
			borderTop: "1px solid #cbcbcb",
			bottom: 0
		}
        return (
            <div className="AkashicFooterWrapper">
                <div style={ {marginBottom: 193} }></div>

                <div className="w3-bar " style={footerStyle}>
                    <h3 className="w3-bar-item w3-right">Akashic Records</h3>
                </div>
            </div>
        );
    }
}
export default MainPage;