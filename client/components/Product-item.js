import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const ProductItem = (props)=>{
  const {product} = props

  return (
    <div>
       <img className='productItem'/>
    </div>
  )
}

const MapState = (state, ownProps)=>{
  return {
    product: ownProps.product
  }
}

export default connect(MapState)(ProductItem)
