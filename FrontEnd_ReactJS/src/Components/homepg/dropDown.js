import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TripDial from "../Forms/TripDial";
import ShipmentDial from "../Forms/ShipmentDial";

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShipment = () => {
    setAnchorEl(null);
  };
  const handleTrip = () => {
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        onClick={handleClick}
        color="primary"
        variant="outlined"
      >
        Create +
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleShipment}>
          <TripDial username={props.username} />
        </MenuItem>
        <MenuItem onClick={handleTrip}>
          <ShipmentDial username={props.username} />
        </MenuItem>
      </Menu>
    </div>
  );
}
