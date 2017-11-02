import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ProductItem from './ProductItem'
import SearchBar from './SearchBar'
import {GridList, GridTile} from 'material-ui/GridList';

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
    height: 450,
    overflowY: 'auto',
  },
};

  return (
      <div style={styles.root}>
        <GridList cellHeight={500} style={styles.gridList} cols={4}>
        {products && products.map(product =>
          <GridTile key={product.id}>
            <ProductItem
              product={product}
              cart={cart}
              handleAddToCart={handleAddToCart}
              handleChangeQuantity={handleChangeQuantity}/>
          </GridTile>
        )}
        </GridList>
        <SearchBar history={props.history} />
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
