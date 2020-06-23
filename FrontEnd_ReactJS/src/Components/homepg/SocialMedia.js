import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import InstagramIcon from "@material-ui/icons/Instagram";
import { Link } from "react-router-dom";

class SocialMedia extends React.Component {
  render() {
    return (
      <div className="footer-2">
        <Typography variant="h2" color="primary">
          Join our Family!
        </Typography>
        <Link to="/SignUp">
          <Button
            variant="contained"
            color="primary"
            endIcon={<InstagramIcon />}
          >
            <Typography color="">Follow Us on Instagram!</Typography>
          </Button>
        </Link>
      </div>
    );
  }
}
export default SocialMedia;
