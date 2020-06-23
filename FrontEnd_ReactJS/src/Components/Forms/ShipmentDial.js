import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CardTravelIcon from "@material-ui/icons/CardTravelRounded";
import CountryChooser from "../SearchPg/Countrychooser";
import Datepicker from "../SearchPg/DatePicker";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ItemTable from "./itemTable";
import PicPanel from "./ItemPicsPanle";
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
      title: "",
      OfferedReward: "",
      date: new Date(),
      description: "",
      Id: "",
      ItemDialOpen: false,
      itemArray: "",
      lookupTable: {
        0: "Electronic",
        1: "Food",
        2: "Accessories",
        3: "Cameras",
        4: "Weapons",
        5: "Kitchen",
        6: "Stationary",
        7: "Other",
      },
      selectedFiles: [],
      PanelItems: "",
      shipmentCreated:false,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.fromCountry = this.fromCountry.bind(this);
    this.toCountry = this.toCountry.bind(this);
    this.chosenDate = this.chosenDate.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.handleAddShipment = this.handleAddShipment.bind(this);
    this.getReward = this.getReward.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleAdditem = this.handleAdditem.bind(this);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, shipmentCreated:false });
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

  writtenDesc(written) {
    this.setState({ description: written });
  }
  getTitle(title) {
    this.setState({ title: title });
  }
  getReward(reward) {
    this.setState({ OfferedReward: reward });
  }
  handleAddShipment() {
    axios
      .post(this.fullUrl + "/addShipment", this.state)
      .then((Response) => this.handleResponse(Response));
    this.setState({ open: false, shipmentCreated:true });
  }

  handleAdditem(item) {
    this.setState({
      ItemDialOpen: true,
      itemArray: item,
    });
  }
  handleResponse(Response) {
    this.setState({ Id: Response.data["Id"] });
    const fd = new FormData();
    var counter = 1;
    for (var i = 0; i < this.state.selectedFiles.length; i++) {
      var fileList = this.state.selectedFiles[i];
      fd.append(`image${counter}`, fileList);
      counter++;
    }
    axios.post(
      this.fullUrl + `/addPics/${this.state.username}/${this.state.Id}`,
      fd
    );
    this.setState({ selectedFiles: [] }, () => {
      window.location.reload();
    });
    if (this.props.created)
      this.props.created(Response.data["created"], this.state);
  }
  handleSelectedFile = (event) => {
    let new_img;
    new_img = this.state.selectedFiles.concat(event.target.files[0]);
    const Panelcomps = new_img.map((pic) => (
      <PicPanel ImgDetails={{ Pic: pic, Name: pic.name }} />
    ));
    this.setState({
      selectedFiles: new_img,
      PanelItems: Panelcomps,
    });
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          <CardTravelIcon />
          Shipment
        </Button>
        <Dialog
          fullScreen={true}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          // style={{ width: 2000 }}
        >
          <DialogTitle id="form-dialog-title">Create Shipment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide the information of your shipment.
            </DialogContentText>
            <CountryChooser from={true} fromCountry={this.fromCountry} />
            <CountryChooser from={false} toCountry={this.toCountry} />
            <Datepicker chosenDate={this.chosenDate} fullWidth label={"On"} />
            <TextField
              style={{ marginBottom: 10 }}
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              fullWidth
              onChange={(event) => this.getTitle(event.target.value)}
            />

            <InputLabel htmlFor="standard-adornment-amount">
              Offered Reward
            </InputLabel>
            <Input
              style={{ width: 400 }}
              id="standard-adornment-amount"
              onChange={(event) => this.getReward(event.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              fullWidth
              onChange={(event) => this.writtenDesc(event.target.value)}
            />
            <DialogTitle id="form-dialog-title">Shipment Items</DialogTitle>
            <ItemTable Items={this.handleAdditem} />
          </DialogContent>
          <Button
            variant="contained"
            color="default"
            style={{ margin: 1 }}
            startIcon={<CloudUploadIcon />}
          >
            <input
              type="file"
              onChange={this.handleSelectedFile}
              accept="image/*"
              style={{
                opacity: 0,
                fontSize: "100px",
                position: "absolute",
                left: 0,
                top: 0,
              }}
            />
            Upload Pictures
          </Button>
          {this.state.PanelItems}
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>

            <Button
              onClick={this.handleAddShipment}
              variant="outlined"
              color="primary"
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* success dialog */}
        <Dialog
          open={this.state.shipmentCreated}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <DialogTitle id="alert-dialog-title" style={{ alignItems: "center" }}>
              {"Shipment Created Successfully"}
            </DialogTitle>
            <CheckCircleIcon style={{ color: '#3ac569' }} />

          </div>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">

              Your Shipment was created successfully. You may view it on your profile.
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
