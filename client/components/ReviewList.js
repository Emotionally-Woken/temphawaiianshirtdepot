import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


const ReviewList = (props)=>{
  let {reviews, productId} = props
  let selectedReviews;
  if(reviews){
    selectedReviews = reviews.filter(review => review.productId === +productId)
  }

  return (
    <div>
     { selectedReviews && selectedReviews.map(review => (
       <div>{review.reviewContent}</div>
     ))}
    </div>
  )
}

const MapState = (state, ownProps) => ({
  reviews: state.reviews.allReviews,
  productId: ownProps.productId
})

export default connect(MapState)(ReviewList)
