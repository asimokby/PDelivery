import React, { Component } from "react";

import Form from './Form'

export default class PopUp extends Component {
    handleClick = () => {
        this.props.toggle();
    };
    constructor(props) {
        super(props)
        this.style = {
            backgroundColor: '#757575',
            borderRadius: '3px',
            border: 'none',
            color: 'white',
            padding: '16px 32px',
            textDecoration: 'none',
            margin: '4px 2px',
            cursor: 'pointer',

        }

    }
   
    render() {
        return (
            <div className="popUp" style={this.style}>
                <div className="popUp_content">
                    <Form index={this.props.index} handleFormSubmit={this.props.handleFormSubmit}/>
                </div>
            </div>
        );
    }
}