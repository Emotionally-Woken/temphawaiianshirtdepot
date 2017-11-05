import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addProduct } from '../store'
import TextField from 'material-ui/TextField'
import { orange500, blue500 } from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'

class AddNewProduct extends Component {

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
    return (
      <form name="myForm" onSubmit={this.emptyState}>
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
            hintText="$$$"
            errorText="This field is required."
            errorStyle={styles.errorStyle}
          /><br />
          <TextField
            value={this.state.image}
            onChange={this.handleChange}
            type="text"
            name="image"
            hintText="Image Url"
            errorText=""
            errorStyle={styles.errorStyle}
          /><br />

            <FlatButton styles={'margin-bottom: 20px'} type="submit" label="Create Product" primary={true} />
        </fieldset>
      </form>
    )
  }

}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: (event) => {
      const title = event.target.title.value
      const description = event.target.description.value
      const price = event.target.price.value
      const image = event.target.image.value
      const newProduct = { title, description, price, image }
      dispatch(addProduct(newProduct, ownProps.history))

    }
  }
}

export default connect(null, mapDispatch)(AddNewProduct)
