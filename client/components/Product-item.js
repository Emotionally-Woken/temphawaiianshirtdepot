import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {NavLink, Link} from 'react-router-dom';

const ProductItem = (props)=>{
  const {product} = props

  return (
    <Card>
      <CardMedia>
        <img
        src="https://hawaiishirtcompany.com/wp-content/uploads/102c_98_black.jpg" alt="" />
      </CardMedia>
      <CardTitle title={product.title} titleStyle={{'fontSize':'12px'}}
/>
      <CardActions>
        <FlatButton label="Put in Cart" />
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
