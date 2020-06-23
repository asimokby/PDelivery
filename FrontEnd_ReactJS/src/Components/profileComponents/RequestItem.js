import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import RequestItemDetails from './RequestItemDetails';

export default class RequestCards extends Component {
    _isMounted = false; 
    constructor(props) {
        super(props)
        this.fullUrl = "http://localhost:5000";
        this.otherName = ''
        this.state = {
            profilePic:null,
        }
    }

    componentDidMount() {
        this.props.request.senderUsername == this.props.myUsername ?
            this.otherName = this.props.request.receiverUsername : this.otherName = this.props.request.senderUsername
        this.getProfilePic()
    }

    getProfilePic() {
        fetch(this.fullUrl + `/getProfilePic/${this.otherName}`).then(res => {
            this.setState({ profilePic: res.url })

        })
    }

    render() {
        return (
            <div>
                <ListItem >
                    <ListItemAvatar>
                        <Avatar
                            alt={''}
                            src={this.state.profilePic}
                        />
                    </ListItemAvatar>

                    <a className='links' href={`/accounts/${this.otherName}`}>
                    <ListItemText primary={`@${this.otherName}`}
                        secondary={`${this.props.reqShipTrip['trip']['FromLocation']} - ${this.props.reqShipTrip['trip']['ToLocation']}`}

                    />
                    </a>

                    <ListItemSecondaryAction>
                        <RequestItemDetails reqShipTrip={this.props.reqShipTrip} request={this.props.request}type={this.props.type} Username={this.props.myUsername} />
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />

            </div>
        )
    }
}
