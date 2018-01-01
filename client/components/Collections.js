import React from 'react'
import { connect } from 'react-redux'
import ProductItem from './ProductItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { GridList, GridTile } from 'material-ui/GridList'
import {addToCartThunk, changeQuantityThunk} from '../store'
//this is f/collections branch
export const Collections = ({ products, cart, collectionType, handleAddToCart, handleChangeQuantity }) => {
  //Lets put this styles object in a separate file !
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
}

let filteredProducts

  if (products) {

    filteredProducts = products.filter(product => product.categories.find(category => category.title === collectionType))
  }
  return (
    <MuiThemeProvider>
      <div style={styles.root}>
        <GridList cellHeight={500} style={styles.gridList} cols={4}>
          {
            filteredProducts.map(product => (
              <GridTile key={product.id}>
                <ProductItem
                handleAddToCart={handleAddToCart}
                handleChangeQuantity={handleChangeQuantity}
                cart={cart}
                product={product} />
              </GridTile>
            ))
          }
        </GridList>
      </div>
    </MuiThemeProvider>

  )

}

const MapState = (state, ownProps) => {
  return {
    products: state.products,
    cart: state.cart,
    collectionType: ownProps.match.params.category

  }
}

const MapDispatch = (dispatch, ownProps) => {
  return {
    handleAddToCart: (item, cart) => {
    dispatch(addToCartThunk(item, cart))
  },
    handleChangeQuantity: (orderDetail) => {
      dispatch(changeQuantityThunk(orderDetail, 'increment'))
      ownProps.history.push('/cart')
    }
  }
}
export default connect(MapState, MapDispatch)(Collections)
