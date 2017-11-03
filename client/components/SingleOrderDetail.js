import React, {Component} from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper'
import {GridList, GridTile} from 'material-ui/GridList'
import {List, ListItem} from 'material-ui/List'
import {Link} from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import ReviewForm from './ReviewForm'

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

class SingleOrderDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render(){
  let {detail, products, reviews, userId} = this.props
  let orderedProduct, productReview;
  if (products && products.length){
    orderedProduct = products.find(product => detail.productId === product.id)
    if (reviews && reviews.length){
      productReview = reviews.find(review => (
        review.userId === userId && review.productId === orderedProduct.id
      ))
    }
  }
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onClick={this.handleClose}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      onClick={this.handleClose}
    />,
  ];

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
          <ListItem insetChildren={true} disabled={true} primaryText={`Review: ${productReview}`} /> :
          <ListItem insetChildren={true} disabled={true}>
            <div>
           <RaisedButton label="Review" onClick={this.handleOpen} />
            <Dialog
            title="Review"
           actions={actions}
           modal={true}
            open={this.state.open}
            >
            <ReviewForm product={orderedProduct} />
            Only actions can close this dialog.
           </Dialog>
           </div>
       </ListItem>
          }
        </List>
        </GridTile>
     </GridList>
    </div>
  )
}
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

{/* <Link to={'/reviews'}><ListItem insetChildren={true} disabled={true}><FlatButton label="Review" primary={true} /></ListItem></Link> */}
n
