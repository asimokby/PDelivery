import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import WorkIcon from "@material-ui/icons/Work";

class WorkwithUs extends React.Component {
  render() {
    return (
      <div class="footer-1">
        <Typography variant="h2" color="primary">
          Work with Us!
        </Typography>
        <Button variant="contained" color="primary" endIcon={<WorkIcon />}>
          <Typography color="">Join our Team Now!</Typography>
        </Button>
      </div>
    );
  }
}
export default WorkwithUs;
