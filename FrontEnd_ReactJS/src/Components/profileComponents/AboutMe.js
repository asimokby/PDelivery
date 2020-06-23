import React, { Component } from "react";
import ContentEditable from "react-contenteditable";
import Button from "@material-ui/core/Button";
import axios from "axios";

import "../../profileCss/aboutMe.css";

export class AboutMe extends Component {
  constructor(props) {
    super();
    this.fullUrl = "http://localhost:5000";
    this.state = {
      name: "Asim",
      username: "asimokby",
      email: "asemokbey@gmail.com",
      location: "Turkey",
    };
    this.updateInfo = this.updateInfo.bind(this);
  }
  async componentDidMount() {
    await this.props;
    this.setState({
      name: this.props.userInfo.Name,
      email: this.props.userInfo.Email,
      location: this.props.userInfo.Country,
      username: this.props.userInfo.Username,
    });
  }
  handleNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  };

  handleEmailChange = (evt) => {
    this.setState({ email: evt.target.value });
  };

  handleLocationChange = (evt) => {
    this.setState({ location: evt.target.value });
  };

  updateInfo() {
    axios.post(this.fullUrl + "/updateUserInfo", this.state).then(res => window.location.reload());

  }

  render() {
    if (!this.props.userInfo) {
      return <div></div>;
    }
    console.log(this.props);

    return (
      <div id="mainDiv">
        <div id="infoDisplay">
          <div id="item">
            <label id="label">Name: </label>

            <ContentEditable
              html={this.state.name} // innerHTML of the editable div
              disabled={false} // use true to disable editing
              onChange={this.handleNameChange} // handle innerHTML change
              style={{ width: "150px", display: "inline-block" }}
            />
          </div>

          <div id="item">
            <label id="label">Username: </label>
            <ContentEditable
              html={this.state.username} // innerHTML of the editable div
              disabled={true} // use true to disable editing
              style={{ display: "inline-block" }}
            />
          </div>

          <div id="item">
            <label id="label">Email: </label>
            <ContentEditable
              html={this.state.email} // innerHTML of the editable div
              disabled={false} // use true to disable editing
              onChange={this.handleEmailChange} // handle innerHTML change
              style={{ width: "250px", display: "inline-block" }}
            />
          </div>

          <div id="item">
            <label id="label">Location: </label>
            <ContentEditable
              html={this.state.location} // innerHTML of the editable div
              disabled={false} // use true to disable editing
              onChange={this.handleLocationChange} // handle innerHTML change
              style={{ width: "200px", display: "inline-block" }}
            />
          </div>
        </div>
        <div id="updateButton" style={{ marginLeft: "25px" }}>
          <Button
            onClick={this.updateInfo}
            variant="contained"
            className="AllButtons"
            style={{
              background: "#3ac569",
              color: "whitesmoke",
              width: "80px",
            }}
          >
            Update
          </Button>
        </div>
      </div>
    );
  }
}

export default AboutMe;

//References:
// https://github.com/lovasoa/react-contenteditable
