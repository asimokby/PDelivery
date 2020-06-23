import React from 'react';


var style = {
    
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    // position: "relative",
    left: "0",
    bottom: "0",
    height: "40px",
    // marginTop:'200px',
    // // width: "100%",

    // // background: '#ffab62',
    width: '100%',

}

var phantom = {
    // marginBottom: '0px',
    marginTop: '200px',
    display: 'block',
    padding: '20px',
    height: '40px',
    width: '100%',
}

function Footer({ children }) {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                {children}
                <p>@copyright PDelivery 2020</p>
            </div>
        </div>
    )
}

export default Footer