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
      price: '',
      image: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.emptyState = this.emptyState.bind(this)

  }

  handleChange = event => {

    this.setState({ [event.target.name]: event.target.value })
  }
  emptyState = (event) => {
    event.preventDefault()
    this.props.handleSubmit(event);
    this.setState({
      title: '',
      description: '',
      price: '',
      image: ''
    })
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

    return (
      <form name="myForm" onSubmit={this.props.emptyState}>
        <fieldset>
          <label>Enter a new product, Hawaiian Style!</label>
          <TextField
            value={this.state.title}
            onChange={this.handleChange}
            type="text"
            name="title"
            hintText="Title"
            errorText="This field is required."
            errorStyle={styles.errorStyle}
            defaultValue={selectedProduct.title}

          /><br />
          <TextField
            value={this.state.description}
            onChange={this.handleChange}
            type="text"
            name="description"
            hintText="Description"
            errorText="This field is required."
            errorStyle={styles.errorStyle}
            defaultValue={selectedProduct.description}
          /><br />
          <TextField
            value={this.state.price}
            onChange={this.handleChange}
            type="text"
            name="price"
            hintText="$$$"
            errorText="This field is required."
            errorStyle={styles.errorStyle}
            defaultValue={selectedProduct.price}
          /><br />
          <TextField
            value={this.state.image}
            onChange={this.handleChange}
            type="text"
            name="image"
            hintText="Image Url"
            errorText=""
            errorStyle={styles.errorStyle}
            defaultValue={selectedProduct.image}
          /><br />

            <FlatButton styles={'margin-bottom: 20px'} type="submit" label="Create Product" primary={true} />
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

const mapDispatch = (dispatch) => {
  return {
    handleSubmit: (event) => {
      const title = event.target.title.value
      const description = event.target.description.value
      const price = event.target.price.value
      const image = event.target.image.value
      const updatedProduct = { title, description, price, image }
      dispatch(changeProduct(updatedProduct))

    }
  }
}

export default connect(mapState, mapDispatch)(EditProduct)
