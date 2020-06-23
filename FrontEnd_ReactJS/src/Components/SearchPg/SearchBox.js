import React from "react";
import Switcher from "./Switcher";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import TripCard from "./TripCard";
import ShipmentCard from "./ShipmentCard";
import CountryChooser from "./Countrychooser";
import Datepicker from "./DatePicker";
import TimePicker from "./TimePicker";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.fullUrl = "http://localhost:5000";
    this.state = {
      trips: [],
      shipments: [],
      item: [],
      unWantedCategories: [],
      midpoints: [],
      resultsLable: false,
      from: "",
      to: "",
      date: new Date(),
      switch: "shipments",
      username: "",
    };
    this.fromCountry = this.fromCountry.bind(this);
    this.toCountry = this.toCountry.bind(this);
    this.chosenDate = this.chosenDate.bind(this);
    // this.chosenTime = this.chosenTime.bind(this);
    this.chosenSwitch = this.chosenSwitch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    if (this.props.session.username) {
      fetch(this.fullUrl + `/suggestedResults/${this.props.session.username}`)
        .then((Response) => Response.json())
        .then((data) =>
          this.setState({
            trips: data.trips,
            shipments: data.shipments,
            items: data.items,
            unWantedCategories: data.unWantedCategories,
            midpoints: data.midpoints,
            itemsPics: data.itemPics,
          })
        );
    }
  }

  handleSearch() {
    if (this.state.from === "" || this.state.to === "") return;

    this.setState({
      trips: [],
      shipments: [],
      username: this.props.session.username,
      resultsLable: true,
    });
    axios.post(this.fullUrl + "/handleSearch", this.state).then((Response) => {
      this.setState({
        trips: Response.data.trips,
        shipments: Response.data.shipments,
        items: Response.data.items,
        unWantedCategories: Response.data.unWantedCategories,
        midpoints: Response.data.midpoints,
        itemsPics: Response.data.itemPics,
      });
    });
  }

  fromCountry(chosen) {
    this.setState({ from: chosen });
  }

  toCountry(chosen) {
    this.setState({ to: chosen });
  }

  chosenDate(chosen) {
    this.setState({ date: chosen });
  }

  chosenSwitch(val) {
    this.setState({ switch: val });
  }
  render() {
    // console.log("The mighty state", this.state);

    return (
      <div>
        <div className="curved-div upper">
          <svg viewBox="0 0 1440 319">
            <path
              fill="#3ac569"
              fillOpacity="1"
              d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="curved-div">
          <h1>Where to Next?</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CountryChooser from={true} fromCountry={this.fromCountry} />
            <CountryChooser from={false} toCountry={this.toCountry} />
            <Datepicker chosenDate={this.chosenDate} label={"Untill"} />
            {/* <TimePicker chosenTime={this.chosenTime} /> */}
          </div>
          <br></br>
          <Switcher chosenSwitch={this.chosenSwitch} />
          <br></br>
          <br></br>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={this.handleSearch}
          >
            SEARCH
          </Button>{" "}
          <svg viewBox="0 0 1440 319">
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        <Divider />
        <br></br>

        {this.props.session.username &&
        !this.state.resultsLable &&
        (this.state.trips.length != 0 || this.state.shipments.length != 0) ? (
          <Typography
            variant="h3"
            color="primary"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {" "}
            SUGGESTED{" "}
          </Typography>
        ) : (
          <div></div>
        )}

        {this.state.resultsLable ? (
          <Typography
            variant="h3"
            color="primary"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {" "}
            Results{" "}
          </Typography>
        ) : (
          <div></div>
        )}

        <br></br>
        <Divider />
        <br></br>

        <Grid container direction="row" justify="center" alignItems="center">
          {this.state.switch === "shipments"
            ? this.state.shipments.map((shipment) => (
                <ShipmentCard
                  key={shipment.Id}
                  items={this.state.items[shipment.Id]}
                  picturesOfItems={this.state.itemsPics[shipment.Id]}
                  details={shipment}
                  session={this.props.session}
                />
              ))
            : this.state.trips.map((trip) => (
                <TripCard
                  key={trip.Id}
                  midpoints={this.state.midpoints[trip.Id]}
                  unWantedCategories={this.state.unWantedCategories[trip.Id]}
                  details={trip}
                  session={this.props.session}
                />
              ))}
        </Grid>
      </div>
    );
  }
}
export default SearchBox;
