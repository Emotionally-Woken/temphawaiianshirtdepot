import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

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
              <ListItem
                primaryText= {review.user.email.slice(0,3)}
                secondaryText={review.reviewContent}
              />
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
