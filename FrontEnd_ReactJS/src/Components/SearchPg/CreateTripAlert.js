import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddTrip from '../Forms/TripDial'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import axios from "axios";

export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [successDialog, setSuccess] = React.useState(false);
    const [created, setCreated] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSuccess(false)
    };

    const tripCreated = (res, trip) => {
        setCreated(res);
        setOpen(false)
        var fullUrl = "http://localhost:5000";
        axios.post(fullUrl + "/registerRequest", { 'sender': 'trip', 'trip': trip, 'shipment': props.shipment })
            .then((Response) => setSuccess(Response.data['registered']));

    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Send Request
      </Button>
            {/* {!created? */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Create a shipment to continue"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <AddTrip username={props.username} created={tripCreated} />
                </DialogActions>
            </Dialog>
            {/* :  */}
            <Dialog
                open={successDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <DialogTitle id="alert-dialog-title" style={{ alignItems: "center" }}>
                        {"Rquest Sent Successfully"}
                    </DialogTitle>
                    <CheckCircleIcon style={{ color: '#3ac569' }} />

                </div>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        Your Trip was created successfully. You can see your requests in your profile.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
        </Button>
                </DialogActions>
            </Dialog>
            {/* } */}
        </div>
    );
}
