import React, { Component } from 'react'
import RequestItem from './RequestItem'
import '../../profileCss/requests.css'
import List from '@material-ui/core/List';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RequestsTabs from './RequestsTabs'
export default class Requests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pendingIncoming: [],
            pendingOutgoing: [],
            accepted: [],
            declined: [],
            reqShipTrip: {},
        }
        this.updateState = this.updateState.bind(this)
        this.arraysEqual = this.arraysEqual.bind(this)

    }

    arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    updateState() {
        this.setState({
            pendingIncoming: this.props.requests.filter(req => req.status == 0 &&  req.receiverUsername === this.props.info.Username),
            pendingOutgoing: this.props.requests.filter(req => req.status == 0 && req.senderUsername === this.props.info.Username),
            accepted: this.props.requests.filter(req => req.status == 1),
            declined: this.props.requests.filter(req => req.status == -1),
            reqShipTrip: this.props.reqShipTrip,

        })
    }
    componentDidMount() {
        this.updateState()
    }
    componentDidUpdate(prevProps) {
        if (!this.arraysEqual(prevProps.requests, this.props.requests)) {
            this.updateState()
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="column">
                        <span className='reqHeader'>Pending</span>
                        <List>
                            {
                                this.state.pendingIncoming.length != 0 ?
                                    this.state.pendingIncoming.map(req => <RequestItem key={req.Id} request={req} type={'pendingIncoming'} reqShipTrip={this.state.reqShipTrip[req.Id]} myUsername={this.props.info.Username} />)
                                    : ''
                            }
                            {
                                this.state.pendingOutgoing.length != 0 ?
                                    this.state.pendingOutgoing.map(req => <RequestItem key={req.Id} request={req} type={'pendingOutgoing'} reqShipTrip={this.state.reqShipTrip[req.Id]} myUsername={this.props.info.Username} />)
                                    : ''
                            }
                        </List >
          
                    </div>
                    <div className="column">
                        <span className='reqHeader'>Accepted</span>
                        <List>
                            {
                                this.state.accepted.length != 0 ?
                                    this.state.accepted.map(req => <RequestItem key={req.Id} request={req} type={'accepted'} reqShipTrip={this.state.reqShipTrip[req.Id]} myUsername={this.props.info.Username} />)
                                    : ''
                            }
                        </List >

                    </div>
                    <div className="column">
                        <span className='reqHeader'>Declined</span>
                        <List>
                            {
                                this.state.declined.length != 0 ?
                                    this.state.declined.map(req => <RequestItem key={req.Id} type={'declined'} reqShipTrip={this.props.reqShipTrip[req.Id]} request={req} myUsername={this.props.info.Username} />)
                                    : ''
                            }
                        </List >

                    </div>

        
                </div>

            </div>
        )
    }
}
