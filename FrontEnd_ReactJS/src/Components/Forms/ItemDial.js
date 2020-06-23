import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import CategoryPicker from "./itemCat";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
class ItemDialog extends React.Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      setOpen: false,
      title: "",
      weight: 0,
      quantity: 0,
      category: "",
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getWeight = this.getWeight.bind(this);
    this.getQuantity = this.getQuantity.bind(this);
    this.getCat = this.getCat.bind(this);
    this.handleInsertItem = this.handleInsertItem.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }
  getTitle(tit) {
    this.setState({ title: tit });
    console.log(tit);
  }
  getWeight(wght) {
    this.setState({ weight: wght });
  }
  getQuantity(qntity) {
    this.setState({ quantity: qntity });
  }
  getCat(cat) {
    this.setState({ category: cat });
  }
  handleInsertItem() {
    this.props.Items(this.state);
    this.setState({ open: false });
  }
  render() {
    // console.log(this.state);
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Add Item
        </Button>
        <Dialog
          // fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Item"}</DialogTitle>
          <DialogContent>
            <TextField
              style={{ width: 400, marginTop: 10, marginBottom: 10 }}
              autoFocus
              margin="dense"
              id="name"
              label="Name of Item"
              fullWidth
              onChange={(event) => this.getTitle(event.target.value)}
            />
            <Input
              style={{ width: 400, marginTop: 10, marginBottom: 10 }}
              id="standard-adornment-weight"
              onChange={(event) => this.getWeight(event.target.value)}
              endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
              aria-describedby="standard-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              placeholder="1-100"
            />
            <Input
              style={{ width: 400, marginTop: 10, marginBottom: 15 }}
              id="standard-adornment-weight"
              onChange={(event) => this.getQuantity(event.target.value)}
              endAdornment={
                <InputAdornment position="end">Piece(s)</InputAdornment>
              }
              aria-describedby="standard-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              placeholder="1-50"
            />
            <CategoryPicker Cat={this.getCat} />
            <DialogContentText>Picture(s) of Item</DialogContentText>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClickOpen}
            >
              Add Pic(s)
            </Button>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleInsertItem} color="primary" autoFocus>
              Insert Item
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default ItemDialog;
