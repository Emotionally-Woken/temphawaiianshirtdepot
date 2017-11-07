import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCategory } from '../store'
import TextField from 'material-ui/TextField'
import { orange500, blue500 } from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'

class AddNewCollection extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: ''
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  emptyState = (event) => {
    event.preventDefault()
    this.props.handleSubmit(event)
    this.setState({category: ''})
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
        <label> Enter a new Collection </label>
        <TextField
          value={this.state.title}
          onChange={this.handleChange}
          type="text"
          name="category"
          hintText="Title"
          errorText="This field is required."
          errorStyle={styles.errorStyle}
        /><br />
        <FlatButton styles={'margin-bottom: 20px'} type="submit" label="Create Collection" primary={true} />
      </form>
    )
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: (event) => {
      const title = event.target.category.value
      const collection = {title}
      dispatch(addCategory(collection, ownProps.history))
    }
  }
}

export default connect(null, mapDispatch)(AddNewCollection)
