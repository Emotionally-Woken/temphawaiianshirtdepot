import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeProduct } from '../store'
import TextField from 'material-ui/TextField'
import { orange500, blue500 } from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'

class EditProduct extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      price: 0,
      image: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.emptyState = this.emptyState.bind(this)

  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  emptyState (event) {
    event.preventDefault()
    this.props.handleSubmit(event);
    // this.setState({
    //   title: '',
    //   description: '',
    //   price: 0,
    //   image: ''
    // })
  }

  render() {
    const styles = {
      errorStyle: {
        color: orange500,
      },
      underlineStyle: {
        borderColor: orange500,
      },
      floatingLabelStyle: {
        color: orange500,
      },
      floatingLabelFocusStyle: {
        color: blue500,
      },
    }
    const products = this.props.products
    const productId = +this.props.match.params.productId
    const selectedProduct = products.length ? products.find(product => product.id === productId) : {}
    // console.log("products", products)
    // console.log("productId", productId)
    // console.log("selectedProduct", selectedProduct)

    return (
      <form name="myForm" onSubmit={this.emptyState}>
        <fieldset>
          <label>Update Product:</label>
          <TextField
            defaultValue={selectedProduct.title}
            onChange={this.handleChange}
            type="text"
            name="title"
            hintText="Title"
            errorText="This field is required."
            errorStyle={styles.errorStyle}

          /><br />
          <TextField
            defaultValue={selectedProduct.description}
            onChange={this.handleChange}
            type="text"
            name="description"
            hintText="Description"
            errorText="This field is required."
            errorStyle={styles.errorStyle}

          /><br />
          <TextField
            defaultValue={selectedProduct.price}
            onChange={this.handleChange}
            type="text"
            name="price"
            hintText="$$$"
            errorText="This field is required."
            errorStyle={styles.errorStyle}

          /><br />
          <TextField
            defaultValue={selectedProduct.image}
            onChange={this.handleChange}
            type="text"
            name="image"
            hintText="Image Url"
            errorText=""
            errorStyle={styles.errorStyle}

          /><br />

            <FlatButton styles={'margin-bottom: 20px'} type="submit" label="Submit" primary={true} />
        </fieldset>
      </form>
    )
  }

}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: (event) => {
      const productId = +ownProps.match.params.productId
      const id = +ownProps.match.params.productId
      const title = event.target.title.value
      const description = event.target.description.value
      const price = +event.target.price.value
      const image = event.target.image.value
      const updatedProduct = { title, price, description, image }
      dispatch(changeProduct(productId, updatedProduct, ownProps.history))

    }
  }
}

export default connect(mapState, mapDispatch)(EditProduct)
