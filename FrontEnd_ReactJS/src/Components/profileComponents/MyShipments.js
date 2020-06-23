import React, { Component } from 'react'
import ShipmentCard from '../SearchPg/ShipmentCard'
import Grid from "@material-ui/core/Grid";
export class MyShipments extends Component {
    constructor(props) {
        super(props)
    }
   
    render() {
        return (
            <div>
                <Grid container direction="row" justify="center" alignItems="center">
                    {this.props.shipments.map((shipment) => (
                        <ShipmentCard key={shipment.Id} items={this.props.items[shipment.Id]} picturesOfItems={this.props.itemsPics[shipment.Id]} details={shipment} session={this.props.session} />
                    ))}
                </Grid>
            </div>
        )
    }
}

export default MyShipments
