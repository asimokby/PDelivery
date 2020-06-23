import React, { Component } from "react";
import "../../profileCss/profileCss.css";
import Button from "@material-ui/core/Button";
import StarRatings from "react-star-ratings";
import axios from "axios";

export class ProfileHeader extends Component {
  constructor() {
    super();
    this.fullUrl = "http://localhost:5000";
    this.state = {
      selectedFile: null,
    };
  }

  handleSelectedFile = (event) => {
    this.setState(
      {
        selectedFile: event.target.files[0],
      },
      () => this.uploadFile()
    );
  };

  uploadFile = (event) => {
    const fd = new FormData();
    fd.append("image", this.state.selectedFile);
    axios
      .post(this.fullUrl + `/uploadProfilePic/${this.props.info.Username}`, fd)
      .then(() => window.location.reload());
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="picImageDiv">
            <img
              className="profileImage"
              src={this.props.profilePic}
              alt={`${this.props.info.Username}`}
            />
          </div>

          {this.props.allowAccessAndEdit ? (
            <div className="upload-btn-wrapper">
              <button className="btn">Change Picture</button>
              <input
                type="file"
                onChange={this.handleSelectedFile}
                accept="image/*"
              />
            </div>
          ) : (
            <div />
          )}
          <div className="headerInfo">
            <h1 style={{ margin: 0 }}>{this.props.info.Name}</h1>

            <StarRatings
              rating={this.props.info.userRating}
              starDimension="20px"
              starSpacing="3px"
              starRatedColor="gold"
            />

            <br></br>
            {/* <Button
              variant="contained"
              className="AllButtons"
              style={{
                background: "#3ac569",
                color: "whitesmoke",
                width: "100px",
              }}
            >
              Contact
            </Button> */}
          </div>
        </div>
        {/* <div class='divider'></div> */}

        {/* <div class='headerIconShipment'>
                    <LocalShippingTwoToneIcon style={{ fontSize: 50, color: red[600] }} />
                    <MarkunreadMailboxTwoToneIcon style={{ fontSize: 47, color: red[600] }} />
                </div> */}

        {/* <div class='headerIconDelivery'>
                  
                </div> */}
      </div>
    );
  }
}

export default ProfileHeader;
