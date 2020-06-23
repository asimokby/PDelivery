import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FlightIcon from "@material-ui/icons/Flight";
import Avatar from '@material-ui/core/Avatar';
import DialogAlert from '../../Components/SearchPg/DialogAlert'
import CreateShipmentAlert from '../../Components/SearchPg/CreateShipmentAlert'
import "../../profileCss/profileCss.css";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 380,
    maxHeight: 600,
    minHeight: 250,
    margin: 45,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const [profilePic, setProfilePic] = React.useState('');

  const getProfilePic = () => {
    var fullUrl = "http://localhost:5000";
    fetch(fullUrl + `/getProfilePic/${props.details.Username}`).then(res => {
      setProfilePic(res.url)

    })
  }
  useEffect(() => {
    getProfilePic();
  }, []);


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            alt={''}
            src={profilePic}
          />
        }

        title={<a className='links' href={`/accounts/${props.details.Username}`}>{`@${props.details.Username}`}</a>}
        subheader={props.details.Date}
      />
      <CardContent>
        <Typography variant="h3" component="h2" color="primary">
          {props.details.FromLocation} <FlightIcon />
          {props.details.ToLocation}
        </Typography>

        <br />
        <Typography style={{ fontWeight: 'bold' }} color="primary">
          Midpoints:
          <span style={{ fontWeight: 'normal', color: 'black' }}>{props.midpoints.toString()} </span>
        </Typography>
        {/* <ListItemText primary={props.reqShipTrip['midpoints'].toString()} /> */}

        <Typography style={{ fontWeight: 'bold' }} color="primary">
          Depart Date:
          <span style={{ fontWeight: 'normal', color: 'black' }}>{props.details.Date} </span>
        </Typography>

        <Typography style={{ fontWeight: 'bold' }} color="primary">
          Time:
          <span style={{ fontWeight: 'normal', color: 'black' }}>{props.details.Time} </span>
        </Typography>


        <Typography style={{ fontWeight: 'bold' }} color="primary">
          Available Weight:

           <span style={{ fontWeight: 'normal', color: 'black' }}>{`${props.details.AvailableWeight} KG`}</span>
        </Typography>
        <Typography style={{ fontWeight: 'bold' }} color="primary">
          Unwanted Categories:
              <span style={{ fontWeight: 'normal', color: 'black' }}>{props.unWantedCategories.toString()} </span>
        </Typography>

        <Divider />
        <Typography variant="body2" component="p">
          <br />
          {props.details.Description}
          <br />
        </Typography>
      </CardContent>
      <CardActions>

        {
          props.session.authenticated ?
            (props.session.username != props.details.Username) ?
              <CreateShipmentAlert trip={props.details} username={props.session.username} />
              : ''
            // if the user is not logged in
            : <DialogAlert />
        }
      </CardActions>
    </Card>

  );
}
