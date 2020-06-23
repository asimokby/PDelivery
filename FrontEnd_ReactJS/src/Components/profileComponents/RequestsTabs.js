import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import React, { Component } from 'react'
import 'react-web-tabs/dist/react-web-tabs.css';
import RequestItem from './RequestItem'
// import '../../profileCss/requests.css'
import List from '@material-ui/core/List';
import axios from "axios";

export default class NewNavigation extends React.Component {
    constructor(props) {
        super(props)
        this.fullUrl = "http://localhost:5000";
        this.state = {
            pendingIncoming: [],
            pendingOutgoing: [],
            accepted: [],
            declined: [],
            done:[],
            reqShipTrip: {},
        }
        this.updateState = this.updateState.bind(this)
        this.arraysEqual = this.arraysEqual.bind(this)
        this.periodIsOver = this.periodIsOver.bind(this)

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
            pendingIncoming: this.props.requests.filter(req => req.status == 0 && req.receiverUsername === this.props.info.Username),
            pendingOutgoing: this.props.requests.filter(req => req.status == 0 && req.senderUsername === this.props.info.Username),
            accepted: this.props.requests.filter(req => req.status == 1),
            declined: this.props.requests.filter(req => req.status == -1),
            done: this.props.requests.filter(req => req.status == 2),
            reqShipTrip: this.props.reqShipTrip,
        })
    }
    componentDidMount() {
        this.props.requests.filter(req => req.status == 1).map(req => this.periodIsOver(req.Id))
        this.updateState()
    }

    periodIsOver(Id){
        var tripDate = this.props.reqShipTrip[Id]['trip']['Date']
        var tripTime = new Date(tripDate)
        var currentDate = new Date()
        var periodIsOver = tripTime.getTime() + 86400000 < currentDate.getTime()
        console.log(periodIsOver, 'this is a check ')
        axios.post(this.fullUrl + "/completedDeals", {'reqId': Id, 'periodIsOver': periodIsOver, 'status': 2 }).then((Response) => {
            console.log(Response)
        })

    }

    componentDidUpdate(prevProps) {
        if (!this.arraysEqual(prevProps.requests, this.props.requests)) {
            this.props.requests.filter(req => req.status == 1).map(req => this.periodIsOver(req.Id))
            this.updateState()
        }
    }

    render() {
        return (
            <Tabs defaultTab="vertical-tab-one" vertical>
                <TabList>
                    <Tab tabFor="vertical-tab-one">Pending <span style={{ fontSize: 13 }}>(Incoming)</span>: <span style={{ color: '#3ac569', fontWeight: 'bold' }}>{this.state.pendingIncoming.length}</span></Tab>
                    <Tab tabFor="vertical-tab-two">Pending <span style={{ fontSize: 13 }}>(Outgoing)</span>: <span style={{ color: '#3ac569', fontWeight: 'bold' }}>{this.state.pendingOutgoing.length}</span></Tab>
                    <Tab tabFor="vertical-tab-three">Accepted: <span style={{ color: '#3ac569', fontWeight: 'bold' }}>{this.state.accepted.length}</span></Tab>
                    <Tab tabFor="vertical-tab-four">Declined: <span style={{ color: '#3ac569', fontWeight: 'bold' }}>{this.state.declined.length}</span></Tab>
                    <Tab tabFor="vertical-tab-five">Done: <span style={{ color: '#3ac569', fontWeight: 'bold' }}>{this.state.done.length} </span></Tab>
                </TabList>

                <TabPanel tabId="vertical-tab-one">
                    <List style={{ width: 450 }}>
                        {
                            this.state.pendingIncoming.length != 0 ?
                                this.state.pendingIncoming.map(req => <RequestItem key={req.Id} request={req} type={'pendingIncoming'} reqShipTrip={this.state.reqShipTrip[req.Id]} myUsername={this.props.info.Username} />)
                                : ''
                        }

                    </List >
                </TabPanel>

                <TabPanel tabId="vertical-tab-two">
                    <List style={{ width: 450 }}>
                        {
                            this.state.pendingOutgoing.length != 0 ?
                                this.state.pendingOutgoing.map(req => <RequestItem key={req.Id} request={req} type={'pendingOutgoing'} reqShipTrip={this.state.reqShipTrip[req.Id]} myUsername={this.props.info.Username} />)
                                : ''
                        }
                    </List>
                </TabPanel>

                <TabPanel tabId="vertical-tab-three">
                    <List style={{ width: 450 }}>
                        {
                            this.state.accepted.length != 0 ?
                                this.state.accepted.map(req => <RequestItem key={req.Id} request={req} type={'accepted'} reqShipTrip={this.state.reqShipTrip[req.Id]} myUsername={this.props.info.Username} />)
                                : ''
                        }
                    </List >
                </TabPanel>

                <TabPanel tabId="vertical-tab-four">
                    <List style={{ width: 450 }}>
                        {
                            this.state.declined.length != 0 ?
                                this.state.declined.map(req => <RequestItem key={req.Id} type={'declined'} reqShipTrip={this.props.reqShipTrip[req.Id]} request={req} myUsername={this.props.info.Username} />)
                                : ''
                        }
                    </List >
                </TabPanel>
                <TabPanel tabId="vertical-tab-five">
                    <List style={{ width: 450 }}>
                    {
                        this.state.done.length != 0 ?
                            this.state.done.map(req => <RequestItem key={req.Id} type={'done'} reqShipTrip={this.props.reqShipTrip[req.Id]} request={req} myUsername={this.props.info.Username} />)
                            : ''
                    }
                     </List >
                </TabPanel>
            </Tabs>
        );
    }
}