import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid";
import TripCard from "../SearchPg/TripCard";

export default class MyTrips extends Component {
    constructor(props){
        super(props)
        this.state = {
            trips: [],
            midpoints:[],
            unWantedCategories:[]
        }
    }
   async componentDidMount(){
        await this.props;
        this.setState({trips:this.props.trips,
            midpoints:this.props.midpoints,
            unWantedCategories:this.props.unWantedCategories})
    }

    render() {
        return (
            <div>
                <Grid container direction="row" justify="center" alignItems="center">
                   {this.state.trips.map((trip) => (
                            <TripCard key={trip.Id} midpoints={this.state.midpoints[trip.Id]} unWantedCategories={this.state.unWantedCategories[trip.Id]} details={trip} session={this.props.session} />
                        ))}
                </Grid>
            </div>
        )
    }
}
