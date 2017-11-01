import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ReviewList from './ReviewList'

const SingleProduct = (props)=>{
  let {products, productId} = props
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
        <FlatButton label="Action1" />
        <FlatButton label="Action2" />
      </CardActions>
    </Card> }
  <ReviewList productId={productId} />
  </div>
    )
}

const MapState = (state, ownProps)=>{
  return {
    products: state.product,
    productId: ownProps.match.params.productId
  }
}

export default connect(MapState)(SingleProduct)
