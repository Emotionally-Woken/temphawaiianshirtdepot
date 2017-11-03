import React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper'
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 800,
    height: 350,
    overflowY: 'auto',
  },
};

const SingleOrderDetail = ({detail, products, reviews, userId})=>{
  let orderedProduct, productReview;
  if (products && products.length){
    orderedProduct = products.find(product => detail.productId === product.id)
    if (reviews && reviews.length){
      productReview = reviews.find(review => (
        review.userId === userId && review.productId === orderedProduct.id
      ))
    }
  }


  return (
    <div style={styles.root}>
      <GridList
        cols={2}
        cellHeight={300}
        padding={1}
        style={styles.gridList}
      >
          <Link to={`/item/${orderedProduct.id}`}>
        <GridTile>
           <img src={orderedProduct.image} />
        </GridTile>
          </Link>
        <GridTile>
        <List>
          <ListItem insetChildren={true} disabled={true} primaryText={`Title: ${orderedProduct.title}`} />
          <ListItem insetChildren={true} disabled={true} primaryText={`Price: ${detail.price}`} />
          <ListItem insetChildren={true} disabled={true} primaryText={`Quantity: ${detail.quantity}`} />
          {
            productReview ?
          <ListItem insetChildren={true} disabled={true} primaryText={`Review: ${productReview}`} /> : <ListItem insetChildren={true} disabled={true}><FlatButton label="Review" primary={true} /></ListItem>
          }
        </List>
        </GridTile>
     </GridList>
    </div>
  )
}

const mapState = (state, ownProps)=>{
  return {
    detail: ownProps.detail,
    products: state.products,
    reviews: state.reviews,
    userId: ownProps.userId
  }
}
export default connect(mapState)(SingleOrderDetail)
