import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Review, postReview, cancelReview } from '../store/reviews'

class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0
    }
    this.writeReview = this.writeReview.bind(this)
    this.setStars = this.setStars.bind(this)
  }

  setStars(stars) {
    this.setState({ rating: stars })
  }

  writeReview(evt) {
    evt.preventDefault()
    this.props.postReview({
      stars: this.state.rating,
      reviewContent: evt.target.reviewContent.value,
      userId: this.props.user.id,
      productId: this.props.product.id
    })

    this.props.cancelReview()
  }

  render() {
    return (
      <div>
        { this.props.product &&

        <div className="review-marg">
          <div>
            <form
              onSubmit={evt => this.writeReview(evt)}>
              <div className="field">
                <label className="label">Feedback of {this.props.product.title}</label>
                <div className="control">
                  <textarea
                    name="reviewContent"
                    className="textarea"
                    placeholder="Write Your Review Here" />
                </div>
              </div>

              <div className="field is-group">
                <div className="control">
                  <button
                    type="submit"
                    className="button is-primary">
                    Submit Review
                  </button>
                </div>

                <div className="control">
                  <button
                    onClick={() => this.props.cancleReview()}
                    className="button is-outlined is-danger cancel-review-btn">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>}
      </div>
    )
  }
}

const mapDispatch = { postReview }

export default connect(null, mapDispatch)(ReviewForm)
