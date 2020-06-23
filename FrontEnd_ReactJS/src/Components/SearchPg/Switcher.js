import React, { Component } from "react";
import Switch from "react-switch";

class Switcher extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    var chosen = checked ? "trips" : "shipments";
    this.props.chosenSwitch(chosen);
    this.setState({ checked });
  }

  render() {
    return (
      <Switch
        checked={this.state.checked}
        onChange={this.handleChange}
        width={100}
        onColor="#88dba3"
        uncheckedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 12,
              color: "White",
              paddingRight: 30,
            }}
          >
            Shipments
          </div>
        }
        checkedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 12,
              color: "white",
              paddingRight: 2,
            }}
          >
            Trips
          </div>
        }
        className="react-switch"
        id="icon-switch"
      />
    );
  }
}
export default Switcher;
