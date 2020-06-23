import React, { Component } from 'react'
import StarRatings from 'react-star-ratings';
import Avatar from '@material-ui/core/Avatar';


export class ReviewElement extends Component {

    constructor(props){
        super(props)
        this.fullUrl = "http://localhost:5000";
        this.state = {
            reviewerProfilePic:null
        }
    }

    componentDidMount(){
        this.getProfilePic()
    }

    getProfilePic() {
        fetch(this.fullUrl + `/getProfilePic/${this.props.review.reviewerUsername}`).then(res => {
            this.setState({ reviewerProfilePic: res.url })

        })
    }
    
    render() {       
        const reviewContainer = {
            height: '280px',
        }
        const reviweItem = {
            background: 'white',
            borderRadius: '20px',
            width: '400px',
            height: '200px',
            padding: '1rem 2rem',
            margin: '0 2rem',
            boxShadow: '0 15px 35px 0 rgba(42, 51, 83, .12), 0 5px 15px rgba(0, 0, 0, .06)',
        }

        const reviewText = {
            height: '96px',
            overflow: 'hidden',
            textTransform: 'capitalize',
        }

        return (
            <div style={reviewContainer} className="review__container">
                <div v-for="review in reviews">
                    <div style={reviweItem} className="review__item">
                        <p style={reviewText} className="review__review">{this.props.review.Text}</p>
                        <div style={{display: 'flex', alignItems: 'center'}}className="review__user">
                            <Avatar
                                alt={''}
                                src={this.state.reviewerProfilePic}
                            />

                            <div style={{ marginLeft: '1rem'}}className="review__username">
                                {/* <div style={{ fontWeight: '600', lineHeight: '1.25' }} className="review__name">{this.props.review.reviewerUsername}</div> */}
                                <a className='links' href={`/accounts/${this.props.review.reviewerUsername}`}> <div style={{ fontWeight: '600', lineHeight: '1.25' }} className="review__name">{`@${this.props.review.reviewerUsername}`}</div> </a>
                                
                                <div  style={{ color: 'rgba(black, .75)', lineHeight: '1.25' }} className="review__twitter">
                                    <StarRatings
                                        rating={parseInt(this.props.review.NumOfStars)}
                                    starDimension="15px"
                                    starSpacing="3px"
                                    starRatedColor='gold'
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReviewElement
