import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FlightIcon from "@material-ui/icons/Flight";
import CountryChooser from "../SearchPg/Countrychooser";
import Datepicker from "../SearchPg/DatePicker";
import TimePicker from "../SearchPg/TimePicker";
import axios from "axios";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import Cats from "./UnwantedCats";
import Midpoints from "./Midpoints";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


class FormDialog extends React.Component {
  constructor(props) {
    super();
    this.fullUrl = "http://localhost:5000";
    this.state = {
      open: false,
      username: props.username,
      from: "",
      to: "",
      AvWeight: "",
      date: new Date(),
      time: new Date(),
      description: "",
      Id: "",
      cats: [],
      midPoints: [],
      checked: false,
      tripCreated:false,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.fromCountry = this.fromCountry.bind(this);
    this.toCountry = this.toCountry.bind(this);
    this.chosenDate = this.chosenDate.bind(this);
    this.chosenTime = this.chosenTime.bind(this);
    this.handleAddTrip = this.handleAddTrip.bind(this);
    this.getKGS = this.getKGS.bind(this);
    this.getCats = this.getCats.bind(this);
    this.getPoints = this.getPoints.bind(this);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
    // onChange = { handleChange };
  };

  handleClose = () => {
    this.setState({ open: false, tripCreated:false });
  };
  fromCountry(chosen) {
    this.setState({ from: chosen });
  }

  toCountry(chosen) {
    this.setState({ to: chosen });
  }

  chosenDate(chosen) {
    this.setState({ date: chosen });
  }

  chosenTime(chosen) {
    this.setState({ time: chosen });
  }
  writtenDesc(written) {
    this.setState({ description: written });
  }
  getKGS(KG) {
    this.setState({ AvWeight: KG });
  }
  getCats(cat) {
    this.setState({ cats: cat });
  }
  getPoints(point) {
    // this.setState({ midPoints: [...this.state.midPoints, point] });
    // console.log(point);
    this.setState({ midPoints: point });
  }
  handleAddTrip() {
    axios
      .post(this.fullUrl + "/addTrip", this.state)
      .then((Response) => this.handleResponse(Response));
    this.setState({ open: false, tripCreated:true });
  }

  handleResponse(Response) {
    this.setState({ Id: Response.data["Id"] });
    if (this.props.created)
      this.props.created(Response.data["created"], this.state);
  }

  render() {
    // console.log(this.state);

    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          <FlightIcon />
          Trip
        </Button>
        {/* <Slide
          direction="up"
          in={this.state.checked}
          mountOnEnter
          unmountOnExit
        > */}
        <Dialog
          fullScreen={true}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Trip</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide the information of your trip.
            </DialogContentText>
            <CountryChooser from={true} fromCountry={this.fromCountry} />
            <CountryChooser from={false} toCountry={this.toCountry} />
            <Datepicker chosenDate={this.chosenDate} label={"Departs"} />
            <TimePicker chosenTime={this.chosenTime} label={"At"} />
            <br></br>
            <Input
              style={{ width: 400 }}
              id="standard-adornment-weight"
              onChange={(event) => this.getKGS(event.target.value)}
              endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
              aria-describedby="standard-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              placeholder="1-100 KG"
            />
            <FormHelperText id="standard-weight-helper-text">
              Available Weight
            </FormHelperText>
            <Cats Cats={this.getCats} />
            <Midpoints Midpoints={this.getPoints} />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              fullWidth
              onChange={(event) => this.writtenDesc(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAddTrip} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        

        <Dialog
          open={this.state.tripCreated}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <DialogTitle id="alert-dialog-title" style={{ alignItems: "center" }}>
              {"Trip Created Successfully"}
            </DialogTitle>
            <CheckCircleIcon style={{ color: '#3ac569' }} />

          </div>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">

              Your Trip was created successfully. You may view it on your profile.
                    </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              OK
        </Button>
          </DialogActions>
        </Dialog>


      </div>
    );
  }
}
export default FormDialog;
