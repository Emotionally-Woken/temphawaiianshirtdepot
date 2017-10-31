import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const GuestHome = (props) => {
 let {products} = props;
 console.log("products: ", products)

  return (
    <div>
      { (products && products.length) ? <div>
        here!!!! </div> : ''}
      <h3>Welcome You</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
// const mapState = (state) => {
// }

// export default connect(mapState)(GuestHome)
export default GuestHome

/**
 * PROP TYPES
 */
// GuestHome.propTypes = {
//   email: PropTypes.string
// }
