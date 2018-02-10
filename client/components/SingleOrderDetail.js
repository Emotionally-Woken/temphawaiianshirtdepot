import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GridList, GridTile} from 'material-ui/GridList'
import {List, ListItem} from 'material-ui/List'
import {Link} from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import { postReview } from '../store/reviews'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Rating } from 'material-ui-rating'

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
  dropDown: {
    customWidth: {
      width: 200,
    },
  }
};

class SingleOrderDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      textFieldValue: '',
      dropDownValue: 5,
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleCancel = () => {
    this.setState({open: false});
  };

  handleSubmit = () => {
    this.props.postReview({
      reviewContent: this.state.textFieldValue,
      stars: this.state.dropDownValue,
      userId: this.props.userId,
      productId: this.props.detail.productId
    })
    this.setState({open: false});
  };

  handleTextFieldChange = (event) => {
    this.setState({
      textFieldValue: event.target.value
  });
  }

  handleDropDownChange = (event, idx, value) => {
    this.setState({
      dropDownValue: value
  });
  }

  render(){
  let {detail, products, reviews, userId} = this.props
  let orderedProduct, productReview;
  if (products && products.length){
    orderedProduct = products.find(product => detail.productId === product.id)
  }

  if (reviews && reviews.length && orderedProduct){
    productReview = reviews.find(review => (
      review.userId === userId && review.productId === orderedProduct.id
    ))}

  const actions = [
    <FlatButton label="Cancel" primary={true} onClick={this.handleCancel} />,
    <FlatButton label="Submit" primary={true} onClick={this.handleSubmit} disabled={!(this.state.textFieldValue.length > 10)} />,
  ];

  return (
    <div style={styles.root}>
      <GridList cols={2} cellHeight={300} padding={1} style={styles.gridList}>
        <Link to={`/item/${orderedProduct.id}`}>
          <GridTile>
            <img className="productImage" src={orderedProduct.image} />
          </GridTile>
        </Link>
        <GridTile>
          <List>
            <ListItem insetChildren={true} disabled={true} primaryText={`Title: ${orderedProduct.title}`} />
            <ListItem insetChildren={true} disabled={true} primaryText={`Unit Price: $${detail.price}`} />
            <ListItem insetChildren={true} disabled={true} primaryText={`Quantity: ${detail.quantity}`} />
            { productReview ?
            <div>
            <ListItem insetChildren={true} disabled={true} primaryText={`Review: ${productReview.reviewContent}`} />
            <ListItem insetChildren={true} disabled={true} >
            <Rating
              value={productReview.stars}
              max={5}
              readOnly={true}
              /></ListItem></div>
             :
            <ListItem insetChildren={true} disabled={true}>
              <div>
                <RaisedButton label="Review" onClick={this.handleOpen} />
                <Dialog title="Review" actions={actions} modal={true} open={this.state.open} >
                <div>
                  <TextField
                    hintText="Write your review"
                    fullWidth={true}
                    onChange={this.handleTextFieldChange}
                    value={this.state.textFieldValue}
                    errorText="Review needs to be at least 10 characters." />
                  <DropDownMenu
                    style={styles.dropDown}
                    value={this.state.dropDownValue}
                    onChange={this.handleDropDownChange} >
                    <MenuItem value={5} primaryText="5 Star" />
                    <MenuItem value={4} primaryText="4 Star" />
                    <MenuItem value={3} primaryText="3 Star" />
                    <MenuItem value={2} primaryText="2 Star" />
                    <MenuItem value={1} primaryText="1 Star" />
                  </DropDownMenu>
                </div>
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

const mapState = (state, ownProps) => {
  return {
    detail: ownProps.detail,
    products: state.products,
    reviews: state.reviews.allReviews,
    userId: +ownProps.userId
  }
}

const mapDispatch = { postReview }

export default connect(mapState, mapDispatch)(SingleOrderDetail)
