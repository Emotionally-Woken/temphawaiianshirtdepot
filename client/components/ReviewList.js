import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Rating } from 'material-ui-rating'

const ReviewList = (props)=>{
  let {reviews, productId} = props
  let selectedReviews;
  if(reviews){
    selectedReviews = reviews.filter(review => review.productId === +productId)
  }

  return (
    <div>
      <List>
        <Subheader>Reviews</Subheader>
          { selectedReviews && selectedReviews.map(review => (
            <div key={review.id}>
              <ListItem
                disabled={true}
                primaryText= {review.user.firstName}
                secondaryText={review.reviewContent}
              />
              <Rating
              value={review.stars}
              max={5}
              readOnly={true}
              />
            </div>
          ))}
     </List>
    </div>
  )
}

const MapState = (state, ownProps) => ({
  reviews: state.reviews.allReviews,
  productId: ownProps.productId,
  users: state.user
})

export default connect(MapState)(ReviewList)
