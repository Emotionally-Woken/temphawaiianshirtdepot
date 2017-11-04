import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ProductItem from './ProductItem'
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';

import {addToCartThunk, changeQuantityAction} from '../store'

/**
 * COMPONENT
 */
export const AllProducts = (props) => {
 let {products, handleAddToCart, cart, handleChangeQuantity} = props;
 const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1000,
    height: 600,
    overflowY: 'auto',
  },
};

  return (
      <div style={styles.root}>
        <GridList cellHeight={500} style={styles.gridList} cols={4}>
        {products && products.map(product =>
          (<GridTile key={product.id}>
            <ProductItem
              product={product}
              cart={cart}
              handleAddToCart={handleAddToCart}
              handleChangeQuantity={handleChangeQuantity}
            />
          </GridTile>)
        )}
        </GridList>
        <Link to={'/createProduct'} >
          <FlatButton label="Add New Product" />
        </Link>
      </div>
  )
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.products,
    cart: state.cart
  }
}

const MapDispatch = (dispatch, ownProps) => ({
  handleAddToCart: (item) => {
    dispatch(addToCartThunk(item))
  },
  handleChangeQuantity: (orderDetail) => {
    dispatch(changeQuantityAction(orderDetail, 'increment'))
    ownProps.history.push('/cart')
  }
})

// export default connect(mapState)(GuestHome)
export default connect(mapState, MapDispatch)(AllProducts)

/**
 * PROP TYPES
 */
// GuestHome.propTypes = {
//   email: PropTypes.string
// }
