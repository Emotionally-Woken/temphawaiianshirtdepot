import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProductItem from './ProductItem'
import { GridList, GridTile } from 'material-ui/GridList';

import {addToCartThunk, changeQuantityThunk} from '../store'

/**
 * COMPONENT
 */
export const AllProducts = (props) => {
  let { products, handleAddToCart, cart, handleChangeQuantity, user } = props;
  const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      height: '100vh',
      width: '100%',
    },
    gridList: {
      width: '100vw',
      height: '100vh',
      overflowY: 'auto',
    },
  };
if(products) {
  return (
    <div style={styles.root}>
      <GridList cellHeight={500} style={styles.gridList} cols={4}>
        {products.map(product =>
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
    </div>
  )
} else  {
  return (<div>
            <FloatingActionButton >
              <FontIcon className="fa fa-spinner fa-pulse fa-3x fa-fw"
                aria-hidden="true" />
              </FloatingActionButton>
          </div>)
}
}



/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.products.filter(product => +product.quantity > 0),
    cart: state.cart,
    user: state.user
  }
}

const MapDispatch = (dispatch, ownProps) => ({
  handleAddToCart: (item, cart) => {
    dispatch(addToCartThunk(item, cart))
  },
  handleChangeQuantity: (orderDetail) => {
    dispatch(changeQuantityThunk(orderDetail, 'increment'))
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
