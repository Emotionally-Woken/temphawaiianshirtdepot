import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const ProductItem = (props)=>{
  const {product} = props

  return (
    <MuiThemeProvider>
      <Card>
      <CardMedia>
        <img src="https://hawaiishirtcompany.com/wp-content/uploads/102c_98_black.jpg" alt="" />
      </CardMedia>
      <CardTitle title={product.title} titleStyle={{'fontSize':'12px'}}
/>
      <CardActions>
        <FlatButton label="Put in Cart" />
      </CardActions>
    </Card>
  </MuiThemeProvider>
  )
}

const MapState = (state, ownProps)=>{
  return {
    product: ownProps.product
  }
}

export default connect(MapState)(ProductItem)
