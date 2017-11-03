import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addProduct } from '../store'
import TextField from 'material-ui/TextField';
import { orange500, blue500 } from 'material-ui/styles/colors';

class AddNewProduct extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      price: 0,
      image: ''
    }

  }

  handleChange = event => {

    this.setState({ [event.target.name]: event.target.value })
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
    return (
      <form>
        <div>
          <label>Enter a new product, Hawaiian Style!</label>
          <TextField
            value={this.state.name}
            onChange={this.handleChange}
            type="text"
            name="name"
            hintText="Name"
            errorText="This field is required."
            errorStyle={styles.errorStyle}
          /><br />
          <TextField
            value={this.state.description}
            onChange={this.handleChange}
            type="text"
            name="description"
            hintText="Description"
            errorText="This field is required."
            errorStyle={styles.errorStyle}
          /><br />
          <TextField
            value={this.state.price}
            onChange={this.handleChange}
            type="text"
            name="price"
            hintText="Price"
            errorText="This field is required."
            errorStyle={styles.errorStyle}
          /><br />
          <TextField
            value={this.state.image}
            onChange={this.handleChange}
            type="image"
            name="image"
            hintText="Image Url"
            errorText=""
            errorStyle={styles.errorStyle}
          /><br />

        </div>

      </form>
    )
  }

}

const mapDispatch = dispatch => {

  return {
    handleSubmit: event => {
      event.preventDefault()
      const newProduct = {
        name: [event.target.name.value],
        description: [event.target.description.value],
        price: [event.target.price.value],
        image: [event.target.image.value]
      }
      dispatch(addProduct(newProduct))

    }
  }
}

export default connect(null, mapDispatch)(AddNewProduct)
