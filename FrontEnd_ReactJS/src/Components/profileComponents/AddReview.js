import React, { Component } from 'react'
import axios from "axios";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

import TextField from '@material-ui/core/TextField';
import StarRatings from "react-star-ratings";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export class AddReview extends Component {
    constructor(props) {
        super(props)
        this.fullUrl = "http://localhost:5000";
        this.state = {
            open: false,
            text: '',
            rating: 0,
            status: false
        }

        this.handleReview = this.handleReview.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.inputTaken = this.inputTaken.bind(this)
        this.changeRating = this.changeRating.bind(this)
        // this.handleSuccessClose = this.handleSuccessClose.bind(this)
    }

    changeRating(newRating, name) {
        console.log(newRating)
        this.setState({
            rating: newRating
        });
    }

    // handleSuccessClose(){
    //     this.setState({status:false})
    // }
    handleReview() {
        // create a review
        this.setState({ open: true })

    }
    handleClose() {
        this.setState({ open: false, status:false })
    }
    inputTaken(event) {
        event.preventDefault();
        this.setState({ text: event.target.value })
    }

    handleSubmit() {
        var who = ''
        var otherPerson = this.props.req.receiverUsername
        if (this.props.Username == this.props.req.receiverUsername) {
            otherPerson = this.props.req.senderUsername
            who = 'receiverRev'
        } else { who = 'senderRev' }
        axios.post(this.fullUrl + "/addReview", {
            'reqId': this.props.req.Id, 'who': who,
            'TripID': this.props.reqShipTrip['trip']['Id'], 'ShipmentID': this.props.reqShipTrip['shipment']['Id'],
            'reviewerUsername': this.props.Username, 'revieweeUsername': otherPerson, 'NumOfStars': this.state.rating, 'Text': this.state.text
        }).then((Response) => this.setState({ open: false, status: true }))
    }

    render() {
        return (
            <div>
                <Button
                    variant="outlined"
                    size="small"
                    autoFocus
                    onClick={this.handleReview}>
                    Review
              </Button>

                <Dialog
                    // style={{ width: 400, height: 100 }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Review this deal"}</DialogTitle>
                    <DialogContent>
                        <TextField

                            id="full-width-text-field"
                            style={{ width: 500 }}
                            label="Review"
                            multiline
                            rows={5}
                            variant="outlined"
                            autoFocus
                            onChange={this.inputTaken}
                        />
                        <br></br>
                        <StarRatings
                            rating={this.state.rating}
                            starRatedColor="gold"
                            starHoverColor='gold'
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                            starDimension="25px"
                            starSpacing="3px"
                        />
                        {/* </form> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>


                <Dialog
                    open={this.state.status}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <DialogTitle id="alert-dialog-title" style={{ alignItems: "center" }}>
                            {"Review Sent Successfully"}
                        </DialogTitle>
                        <CheckCircleIcon style={{ color: '#3ac569' }} />

                    </div>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                            Your Review was published successfully on the reviewee's profile. 
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            OK
        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default AddReview
