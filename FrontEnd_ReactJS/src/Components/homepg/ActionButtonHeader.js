import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

class ActioCall extends React.Component {
  render() {
    return (
      <div className="header">
        <Typography variant="h2">What are you waiting for?</Typography>
        <Link to="/SignUp">
          <Button variant="outlined" color="secondary" size="large">
            Get Started Now!
          </Button>
        </Link>
      </div>
    );
  }
}
export default ActioCall;
