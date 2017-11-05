import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ReviewList from './ReviewList'
import { addToCartThunk, changeQuantityThunk } from '../store'
import Paper from 'material-ui/Paper';


const SingleProduct = (props) => {
  let isAdmin
  let { products, productId, cart, handleAddToCart, handleChangeQuantity, user } = props
  
  let selectedProduct
  if (products) {
    selectedProduct = products.find(product => product.id === +productId)
  }
  if (user) {
    isAdmin = user.id && user.admin
  }

  return (
    <div>
      {selectedProduct &&
        <div>
          <Card>
            <CardHeader
              title={selectedProduct.category}
              avatar="http://travelskills.com/wp-content/uploads/2015/04/VirginAloha.gif"
            />
            <CardMedia>
              <img
                src={selectedProduct.image} alt="" />
            </CardMedia>
            <CardTitle title={selectedProduct.title} />
            <CardText>
              {selectedProduct.description}
            </CardText>
            <CardActions>
              <FlatButton primary={true} label="Add to Cart"
                onClick={() => {
                  const orderDetail = cart.orderDetails.find(item => item.productId === selectedProduct.id)
                  if (orderDetail) {
                    orderDetail.quantity < selectedProduct.quantity ? handleChangeQuantity(orderDetail) : alert("not enough inventory")
                  } else {
                    handleAddToCart(selectedProduct, cart)
                  }
                }}
              />
            </CardActions>
          </Card>
          <br />
          <Paper>
            <ReviewList productId={productId} />
          </Paper>
        </div>
      }

      {

        isAdmin &&
        <Link to={`/editProduct/${productId}`} >
          <FlatButton label="Edit Product" />
        </Link>
      }
    </div>
  )
}

const MapState = (state, ownProps) => {
  return {
    products: state.products,
    productId: ownProps.match.params.productId,
    cart: state.cart,
    user: state.user
  }
}

const MapDispatch = (dispatch, ownProps) => {
  return {
    handleAddToCart: (item, cart) => {
      dispatch(addToCartThunk(item, cart))
    },
    handleChangeQuantity: (orderDetail) => {
      dispatch(changeQuantityThunk(orderDetail, 'increment'))
      ownProps.history.push('/cart')
    }
  }
}

export default connect(MapState, MapDispatch)(SingleProduct)
