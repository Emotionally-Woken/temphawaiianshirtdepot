import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ReviewList from './ReviewList'
import {addToCartThunk, changeQuantityAction} from '../store'

const SingleProduct = (props)=>{
  let {products, productId, cart, handleAddToCart, handleChangeQuantity} = props
  let selectedProduct
  if(products){
    selectedProduct = products.find(product => product.id === +productId)
  }

  return (
    <div>
    { selectedProduct &&
      <Card>
        <CardHeader
        title="URL Avatar"
        subtitle="Subtitle"
        avatar="http://travelskills.com/wp-content/uploads/2015/04/VirginAloha.gif"
      />
      <CardMedia
        overlay={<CardTitle title={selectedProduct.title}subtitle="Overlay subtitle" />}
      >
        <img
        src="https://hawaiishirtcompany.com/wp-content/uploads/102c_98_black.jpg" alt="" />
      </CardMedia>
      <CardTitle title="Card title" subtitle="Card subtitle" />
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
      <CardActions>
        <FlatButton label="Put in Cart"
        onClick={() => {
          const orderDetail = cart.find(item => item.productId === selectedProduct.id)
          if (orderDetail) {
            orderDetail.quantity < selectedProduct.quantity ? handleChangeQuantity(orderDetail) : alert("not enough inventory")
          } else {
            handleAddToCart(product)
          }
        }}
        />
        <FlatButton label="Action2" />
      </CardActions>
    </Card> }
  <ReviewList productId={productId} />
  </div>
    )
}

const MapState = (state, ownProps)=>{
  return {
    products: state.products,
    productId: ownProps.match.params.productId,
    cart: state.cart
  }
}

const MapDispatch = (dispatch, ownProps)=> {
  return {
    handleAddToCart: (item) => {
      dispatch(addToCartThunk(item))
    },
    handleChangeQuantity: (orderDetail) => {
      dispatch(changeQuantityAction(orderDetail, 'increment'))
      ownProps.history.push('/cart')
    }
  }
}

export default connect(MapState, MapDispatch)(SingleProduct)
