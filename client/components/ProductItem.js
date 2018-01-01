import React from 'react'
import {connect} from 'react-redux'
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';

const ProductItem = (props) => {
  const {product, handleAddToCart, handleChangeQuantity, cart} = props

  return (
    <Card>
      <CardMedia>
        <img
        src={product.image} alt="" />
      </CardMedia>
      <CardTitle title={product.title} titleStyle={{fontSize: '12px'}} />
      <CardActions>
        <RaisedButton
          label="Add to Cart"
          primary={true}
          onClick={() => {
            const orderDetail = cart.orderDetails.find(item => item.productId === product.id)
            if (orderDetail) {
              orderDetail.quantity < product.quantity ? handleChangeQuantity(orderDetail) : alert('not enough inventory')
          } else {
            handleAddToCart(product, cart)
          }
        } } />
        <RaisedButton
          label="Product Details"
          secondary={true}
          containerElement={<Link to={`/item/${product.id}`} />} />
      </CardActions>
    </Card>
  )
}

const MapState = (state, ownProps) => {
  return {
    product: ownProps.product
  }
}


export default connect(MapState)(ProductItem)
