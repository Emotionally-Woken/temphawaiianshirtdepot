import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {NavLink, Link} from 'react-router-dom';

const ProductItem = (props)=>{
  const {product, handleAddToCart, handleChangeQuantity, cart} = props
  console.log(product)
  return (
    <Card>
      <CardMedia>
        <img
        src="https://hawaiishirtcompany.com/wp-content/uploads/102c_98_black.jpg" alt="" />
      </CardMedia>
      <CardTitle title={product.title} titleStyle={{'fontSize':'12px'}}/>
      <CardActions>
        <FlatButton label="Add to Cart"
        onClick={()=> {
          const orderDetail = cart.find(item => item.productId === product.id)
          if (orderDetail) {
            orderDetail.quantity < product.quantity ? handleChangeQuantity(orderDetail) : alert("not enough inventory")
          } else {
            handleAddToCart(product)
          }
        } } />
        <FlatButton containerElement={<Link to={`/item/${product.id}`}/>}label="View Details" />
      </CardActions>
    </Card>
  )
}

const MapState = (state, ownProps)=>{
  return {
    product: ownProps.product
  }
}


export default connect(MapState)(ProductItem)
