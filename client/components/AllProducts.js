import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ProductItem from './ProductItem'
import {GridList, GridTile} from 'material-ui/GridList';

/**
 * COMPONENT
 */
export const AllProducts = (props) => {
 let {products} = props;
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
          (<GridTile key={product.id}>
            <ProductItem  product={product} />
          </GridTile>)
        )}
        </GridList>
      </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.products
  }
}

// export default connect(mapState)(GuestHome)
export default connect(mapState)(AllProducts)

/**
 * PROP TYPES
 */
// GuestHome.propTypes = {
//   email: PropTypes.string
// }
