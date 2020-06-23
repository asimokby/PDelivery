import React, { Component } from 'react'

import ReviewElement from './ReviewElement'


export class Reviews extends Component {
    constructor() {
        super()
    }

    render() {

        const outerbodyStyle = {

            height: '70vh',
            background: '#f4f7f8',
            fontFamily: 'Camphor, Open Sans, Segoe UI, sans-serif',
            fontWeight: '300',
            lineHeight: '2',
            WebkitFontSmoothing: 'antialiased',
            textRendering: 'optimizeLegibility',
            overflowX: 'hidden',
        }

        const h1Style = {
            lineHeight: '1',
        }
        const sectionStyle = {
            width: '100vw',
            overflow: 'hidden',
            margin: 'auto',
            display: '-webkit-box',
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'scroll',
            WebkitOverflowScrolling: 'touch'
        }

        const innerBodyStyle = {
            padding: '2rem',
        }

        return (
            <div style={outerbodyStyle}>
                <div style={innerBodyStyle} className="body">
                    <h1 style={h1Style} >See what other travelers and shoppers are saying about me!</h1>
                    <p>{this.props.reviews.length} Reviews</p>
                </div>
                <section style={sectionStyle} id="app">
                    {this.props.reviews.map(rev => <ReviewElement key={rev.Id} review={rev} />)}
                </section>
            </div>
        )
    }
}

export default Reviews
