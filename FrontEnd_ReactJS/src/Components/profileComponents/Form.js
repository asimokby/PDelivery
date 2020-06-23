import React, { Component } from "react";
import Button from '@material-ui/core/Button';


// import axios from 'axios';


export default class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: '',
            to: '',
            date: '',
            arrivalTime: '',
            availableSpace: '',
            description: '',

            };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
  
    handleSubmit(event){
        event.preventDefault();
       
        // accessing submitted data of an (uncontrolled form: that's why im using 'rel')
        this.setState({
            from: this.from.value,
            to: this.to.value,
            arrivalTime: this.arrivalTime.value,
            date: this.date.value,
            availableSpace: this.availableSpace.value,
            description: this.description.value,
        }, function() {
            
    
                this.props.handleFormSubmit(this.state, this.props.index)
        });
    }
        
    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <label>From</label>
                <input 
                    ref={el => this.from = el}
                    name = 'from'
                    type='text'

                />
                <label>To</label>
                <input
                    ref={el => this.to = el}
                    name='to'
                    type='text'

                />
                <label>Date</label>
                <input
                    ref={el => this.date = el}
                    name='date'
                    type='date' defaultValue='2017-06-01'
                />
                <label>Arrival Time</label>
                <input
                    ref={el => this.arrivalTime = el}
                    name='arrivalTime'
                    type='time' defaultValue='13:30'
                />
                <label>Available Space(kg)</label>
                <input
                    ref={el => this.availableSpace = el}
                    name='availableSpace'
                    type='text'
                />
                <label>Description</label>
                <textarea ref={el => this.description = el} id="subject" name="description" placeholder="Talk more about your trip" ></textarea>

                <Button type= 'submit' variant="contained" className='AllButtons' style={{ background: '#3ac569', color: 'whitesmoke' }}>
                    Publish
                </Button>


            </form>
        );
    }
}







