import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ProductItem from './Product-item'

/**
 * COMPONENT
 */
export const GuestHome = (props) => {
 let {products} = props;

  return (
    <div className='row'>
      {products && products.map(product =>
        <div className='col-md-3 justify-content-center'>
          <ProductItem key={product.id} product={product}/>
        </div>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.product
  }
}

// export default connect(mapState)(GuestHome)
export default connect(mapState)(GuestHome)

/**
 * PROP TYPES
 */
// GuestHome.propTypes = {
//   email: PropTypes.string
// }
