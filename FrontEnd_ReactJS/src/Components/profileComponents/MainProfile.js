import React, { Component } from "react";
import HorizontalTabs from "./HorizontalTabs";
import ProfileHeader from "./ProfileHeader";

export class App extends Component {
  constructor() {
    super();
    this.fullUrl = "http://localhost:5000";
    this.state = {
      // username: '',
      info: {},
      reviews: [],
      requests: [],
      trips:[],
      midpoints:[],
      unWantedCategories:[],
      shipments:[],
      items:[],
      reqShipTrip: {},
      userFound: null,
      userRating: null,
      profilePic: null,
      allowAccessAndEdit: false,
      itemsPics: {},
    };
    this.getProfilePic = this.getProfilePic.bind(this);
  }



  getData() {
    var urlArray = this.props.location["pathname"].split("/");
    var username = urlArray[urlArray.length - 1];

    fetch(this.fullUrl + `/getUserInfo/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data == "NOT FOUND") {
          this.setState({ userFound: false });
          return;
        }

        this.getProfilePic(username); // get user's profile picture 
        this.setState({ userFound: true });
        this.setState(
          {
            info: data.info,
            trips:data.trips,
            midpoints:data.midpoints,
            unWantedCategories: data.unWantedCategories,
            shipments:data.shipments,
            items:data.items,
            reviews: data.reviews,
            requests: data.requests,
            reqShipTrip: data.reqShipTrip,
            itemsPics: data.itemsPics,
          },
          () => {
            if (username == this.props.username) {
              this.setState({ allowAccessAndEdit: true });
            }
            console.log(this.state.items, 'in main profile')
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getProfilePic(username) {
    fetch(this.fullUrl + `/getProfilePic/${username}`).then((res) => {
      this.setState({ profilePic: res.url });
    });
  }

  componentDidMount() {
    // this.setState({ username: this.props.username }, () => {
    // console.log(this.state.username)
    this.getData();
    // })
  }

  render() {
    if (this.state.userFound == null) {
      return <div />;
    }
    // console.log(this.state.info);
    return (
      <div className="compWrapper">
        <div className="compHeader">
          {this.state.userFound == true ? (
            <ProfileHeader
              profilePic={this.state.profilePic}
              info={this.state.info}
              allowAccessAndEdit={this.state.allowAccessAndEdit}
            />
          ) : (
            ""
          )}
        </div>
        <div className="compMain">
          {this.state.userFound == true ? (
            <HorizontalTabs
              session = {this.props.session}
              UserInfo={this.state.info}
              allowAccessAndEdit={this.state.allowAccessAndEdit}
              handleFormSubmit={this.handleFormSubmit}
              info={this.state.info}
              trips={this.state.trips}
              shipments={this.state.shipments}
              midpoints={this.state.midpoints}
              unWantedCategories={this.state.unWantedCategories}
              items={this.state.items}
              itemsPics={this.state.itemsPics}
              reviews={this.state.reviews}
              requests={this.state.requests}
              reqShipTrip={this.state.reqShipTrip}
            />
          ) : (
            <div className="usernotfound">
              <h1>404 USER NOT FOUND</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
