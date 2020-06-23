import React from "react";
import logo from "../../Imgs/logo-1.png";
import Typography from "@material-ui/core/Typography";
class Header extends React.Component {
  render() {
    return (
      <div className="header-row">
        <div className="header-column">
          <div className="title">
            <img className="logoHeader " src={logo} alt="Logo"></img>
            <Typography variant="h4" style={{ color: "#767677" }}>
              Delivery, Done Personally.
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
