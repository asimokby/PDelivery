import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Divider } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import DialogAlert from "../../Components/SearchPg/DialogAlert";
import CreateTripAlert from "../../Components/SearchPg/CreateTripAlert";
import "../../profileCss/profileCss.css";
import Item from "./itemDetails";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import "./coverPicCSS.css";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 350,
    maxWidth: 400,

    margin: 45,
  },
  media: {
    height: 50,
    paddingTop: "56.25%", // 16:9.MuiCardMedia-img
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const useStyles2 = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function RecipeReviewCard(props) {
  const classes2 = useStyles2();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [profilePic, setProfilePic] = React.useState("");
  const [CardCoverPic, setCardCoverPic] = React.useState("");

  // const [profilePic, setProfilePic] = React.useState("");

  const getProfilePic = () => {
    var fullUrl = "http://localhost:5000";
    fetch(fullUrl + `/getProfilePic/${props.details.Username}`).then((res) => {
      setProfilePic(res.url);
    });
  };

  useEffect(() => {
    getProfilePic();
    getCover();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getCover = () => {
    var fullUrl = "http://localhost:5000";
    fetch(fullUrl + `/loadShipmentsPics/${props.picturesOfItems[0]}`).then(
      (res) => {
        setCardCoverPic(res.url);
      }
    );
  };

  const shipmentItems = props.items.map((item) => (
    <Item key={0} ItemInfo={item} />
  ));

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar alt={""} src={profilePic} />}
        title={
          <a
            className="links"
            href={`/accounts/${props.details.Username}`}
          >{`@${props.details.Username}`}</a>
        }
        subheader={props.details.RequestedDeliveryDate}
      />
      <div className="container4">
        <img src={CardCoverPic} />
      </div>

      <CardContent>
        <Typography variant="h5" component="h3" color="primary">
          {props.details.Title}
        </Typography>
        <Typography className={classes.subtitle} color="textSecondary">
          {props.details.FromLocation} <FlightTakeoffIcon />
          {props.details.ToLocation}
        </Typography>
      </CardContent>
      <CardActions>
        {props.session.authenticated ? (
          props.session.username != props.details.Username ? (
            <CreateTripAlert
              shipment={props.details}
              username={props.session.username}
            />
          ) : (
            ""
          )
        ) : (
          <DialogAlert />
        )}
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleClickOpen}
        >
          Details
        </Button>
      </CardActions>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes2.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes2.title}>
              Shipment Details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Exit
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText
              primary="From"
              secondary={props.details.FromLocation}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="To" secondary={props.details.ToLocation} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Date"
              secondary={props.details.RequestedDeliveryDate}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Requester Notes"
              secondary={props.details.Description_}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              color="primary"
              primary="Offered Reward"
              secondary={props.details.OfferedReward}
            />
          </ListItem>
          <Divider />
          <Typography variant="h6" className={classes2.title}>
            Items
          </Typography>
          <Divider />
          {shipmentItems}
        </List>
        <Grid container justify="space-evenly" alignItems="center">
          {props.picturesOfItems.map((pic) => (
            <img
              style={{ width: "40%", height: "70%" }}
              src={`http://localhost:5000/loadShipmentsPics/${pic}`}
            />
          ))}
        </Grid>
      </Dialog>
    </Card>
  );
}
