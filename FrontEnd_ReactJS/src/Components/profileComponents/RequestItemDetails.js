import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import FlightIcon from "@material-ui/icons/Flight";
import axios from "axios";
import addReview, { AddReview } from './AddReview'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#3ac569',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  declineButton: {
    color: 'red',
    marginLeft: 5,


  },
  acceptButton: {
    color: 'black',
  },
  typography: {
    textAlign: "center",
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [otherUsersInfo, setOtherUsersInfo] = React.useState({})
  const [otherPerson, setOtherPerson] = React.useState('')
  const [reviewed, setReviewed] = React.useState(false)
  const fullUrl = "http://localhost:5000";

  const handleClickOpen = () => {
    if (props.type == 'accepted') {
      props.request.senderUsername == props.Username ?
        setOtherPerson(props.request.receiverUsername, fetchOtherPersonInfo(props.request.receiverUsername))
        :
        setOtherPerson(props.request.senderUsername, fetchOtherPersonInfo(props.request.senderUsername))
    } else if (props.type == 'done') {
      if (props.request.senderUsername == props.Username){
        if (props.request.senderRev == 'None') 
        {
        setReviewed(true);
        }
      }
        else {
        if (props.request.receiverRev == 'None') {
            setReviewed(true);
          }
        }
      setOpen(true);
    }
    else setOpen(true);

  };


  const fetchOtherPersonInfo = (person) => {
    axios.post(fullUrl + "/otherPersonsInfo", { 'username': person }).then((Response) => setOtherUsersInfo(Response.data)).then(() => {
      console.log(otherUsersInfo)
      setOpen(true)
    }
    )
  }

  const handleRequestAccept = () => {
    //accept: updage request's statsu to 1
    axios.post(fullUrl + "/acceptRequest", { 'reqId': props.request.Id, 'status': 1 }).then((Response) => {
      console.log(Response)
      setOpen(false)
      window.location.reload();
    })

  }

  const handleRequestDecline = () => {
    //decline: increment request's stats by -1; deleted when both do so (-2) or when the time comes TODO

    axios.post(fullUrl + "/declineRequest", { 'reqId': props.request.Id, 'status': -1 }).then((Response) => {
      console.log(Response)
      setOpen(false)
      window.location.reload();
    })


  }

  const handleRequestCancel = () => {
    axios.post(fullUrl + "/cancelRequest", { 'reqId': props.request.Id }).then((Response) => {
      console.log(Response)
      setOpen(false)
      window.location.reload();
    })
  }

  const cancelAccept = () => {
    axios.post(fullUrl + "/cancelRequestAccept", { 'reqId': props.request.Id }).then((Response) => {
      console.log(Response)
      setOpen(false)
      window.location.reload();
    })
  }

  const handleClose = () => {
    // TODO  bind the button to this method and based on the status show different buttons 
    setOpen(false);
  };

  return (

    <div>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleClickOpen}
      >
        Details
    </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Details
            </Typography>

            {/* Action */}
            {props.type == 'pendingIncoming' ?
              [
                <Button
                  key={0}
                  autoFocus
                  variant="outlined"
                  size="small"
                  className={classes.acceptButton}
                  onClick={handleRequestAccept}>
                  Accept
            </Button>,

                <Button
                  key={1}
                  variant="outlined"
                  size="small"
                  autoFocus
                  className={classes.declineButton}
                  onClick={handleRequestDecline}>
                  Decline
            </Button>
              ]
              : props.type == 'pendingOutgoing' ?
                <Button
                  variant="outlined"
                  size="small"
                  autoFocus
                  className={classes.declineButton}
                  onClick={handleRequestCancel}>
                  Cancel
            </Button>
                : props.type == 'accepted' ?
                  <Button
                    variant="outlined"
                    size="small"
                    autoFocus
                    className={classes.declineButton}
                    onClick={cancelAccept}>
                    Cancel
              </Button> : props.type == 'done' && reviewed ?
                    <AddReview Username={props.Username} reqShipTrip={props.reqShipTrip} req={props.request} />

                    : props.type == 'declined' ? <span>The request will be deleted in 24 hours</span>
                      : ''
            }

            {/* Action */}
          </Toolbar>


        </AppBar>
        <List>
          <Typography style={{ margin: 12, fontWeight: 'bold' }} variant="h5" component="h3" color="primary"
            className={classes.typography}>
            {props.reqShipTrip['trip']['FromLocation']} <FlightIcon />{props.reqShipTrip['trip']['ToLocation']}
          </Typography>

          {props.type == 'accepted' ?
            <Typography style={{ margin: 12, fontWeight: 'bold' }} variant="h5" component="h6" color="primary">
              Get in touch with {`${otherPerson}`}
              <ListItem >
                <Typography style={{ marginRight: 10, fontWeight: 'bold' }} color="primary">
                  Email:
            </Typography>
                <ListItemText secondary={otherUsersInfo['Email']} />
              </ListItem>
              <ListItem>
                <Typography style={{ marginRight: 10, fontWeight: 'bold' }} color="primary">
                  Phone Number:
            </Typography>
                <ListItemText secondary={otherUsersInfo['PhoneNumber']} />
              </ListItem>
            </Typography> : ''
          }


          <Typography style={{ margin: 12, fontWeight: 'bold' }} variant="h4" component="h3" color="primary">
            Trip
            </Typography>
          <ListItem >
            <ListItemText secondary={`@${props.reqShipTrip['trip']['Username']}`} />
          </ListItem>
          <ListItem >
            <Typography style={{ margin: 12, fontWeight: 'bold' }} color="primary">
              Midpoints:
            </Typography>
            <ListItemText primary={props.reqShipTrip['midpoints'].toString()} />
            <Typography style={{ margin: 12, fontWeight: 'bold' }} color="primary">
              Depart Date:
            </Typography>
            <ListItemText primary={props.reqShipTrip['trip']['Date']} />
            <Typography style={{ margin: 12, fontWeight: 'bold' }} color="primary">
              Depart Time:
            </Typography>
            <ListItemText primary={props.reqShipTrip['trip']['Time']} />
            <Typography style={{ margin: 12, fontWeight: 'bold' }} color="primary">
              Available Weight:
            </Typography>
            <ListItemText primary={`${props.reqShipTrip['trip']['AvailableWeight']} KG`} />
            <Typography style={{ margin: 12, fontWeight: 'bold' }} color="primary">
              Unwanted Categories:
            </Typography>
            <ListItemText primary={props.reqShipTrip['unwantedCategories'].toString()} />

          </ListItem>
          <ListItem>
            <Typography style={{ margin: 12, fontWeight: 'bold' }} color="primary">
              Description:
            </Typography>
            <ListItemText primary={props.reqShipTrip['trip']['Description']} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <Typography style={{ margin: 12 }} variant="h4" component="h3" color="primary">
            Shipment
        </Typography>
          <ListItem >
            <ListItemText secondary={`@${props.reqShipTrip['shipment']['Username']}`} />
          </ListItem>
          <ListItem >
            <Typography style={{ margin: 12, fontWeight: 'bold' }} color="primary">
              Date:
            </Typography>
            <ListItemText primary={props.reqShipTrip['shipment']['RequestedDeliveryDate']} />
            <Typography style={{ margin: 12, fontWeight: 'bold' }} color="primary">
              Reward:
            </Typography>
            <ListItemText primary={props.reqShipTrip['shipment']['OfferedReward']} />
          </ListItem>
          <ListItem >
            <Typography style={{ margin: 12, fontWeight: 'bold' }} color="primary">
              Description:
            </Typography>
            <ListItemText primary={props.reqShipTrip['shipment']['Description_']} />
          </ListItem>

          {props.reqShipTrip['items'].map(item =>
            <ListItem key={item['ID']}>
              <Typography style={{ margin: 20 }} variant="h6" component="h6" color="primary">
                Item 1:
              </Typography>
              <ListItemText primary={item['Name']} />
              <Typography style={{ margin: 12, fontWeight: 'bold' }} color="primary">
                Category:
              </Typography>
              <ListItemText primary={item['Category']} />
              <Typography style={{ margin: 12, fontWeight: 'bold' }} color="primary">
                Weight:
              </Typography>
              <ListItemText primary={`${item['Weight']} KG`} />
              <Typography style={{ margin: 12, fontWeight: 'bold' }} color="primary">
                Quantity:
              </Typography>
              <ListItemText primary={item['Quantity']} />
            </ListItem>
          )}

          {/* <img style={{margin:20}}src={testpic} width="100" height="100" /> */}

        </List>
      </Dialog>
    </div>

  );
}
