import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
import { fetchUserThunk } from '../store'
import TextField from 'material-ui/TextField'
import { orange500, blue500 } from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'

class AddNewUser extends Component {

  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      state: '',
      zip: '',
      shippingAddress: '',
      isAdmin: '',
      password: ''
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
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      state: '',
      zip: '',
      shippingAddress: '',
      isAdmin: '',
      password: ''
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
      <form name="UserForm" onSubmit={this.emptyState}>
        <fieldset>
          <h3>Create New User:</h3>
          <TextField
            value={this.state.firstName}
            onChange={this.handleChange}
            type="text"
            name="firstName"
            hintText="First Name"
            // errorText="This field is required."
            // errorStyle={styles.errorStyle}
          /><br />
          <TextField
            value={this.state.lastName}
            onChange={this.handleChange}
            type="text"
            name="lastName"
            hintText="Last Name"
            // errorText="This field is required."
            // errorStyle={styles.errorStyle}
          /><br />
          <TextField
            value={this.state.email}
            onChange={this.handleChange}
            type="text"
            name="email"
            hintText="e-mail"
            errorText="This field is required."
            errorStyle={styles.errorStyle}
          /><br />
          <TextField
            value={this.state.city}
            onChange={this.handleChange}
            type="text"
            name="city"
            hintText="City"
            // errorText="This field is required."
            // errorStyle={styles.errorStyle}
          /><br />
          <TextField
            value={this.state.state}
            onChange={this.handleChange}
            type="text"
            name="state"
            hintText="State"
            // errorText="This field is required."
            // errorStyle={styles.errorStyle}
          /><br />
          <TextField
            value={this.state.zip}
            onChange={this.handleChange}
            type="text"
            name="zip"
            hintText="Zip Code"
            errorText="This field is required."
            errorStyle={styles.errorStyle}
          /><br />
          <TextField
            value={this.state.shippingAddress}
            onChange={this.handleChange}
            type="text"
            name="shippingAddress"
            hintText="Shipping Address"
            // errorText="This field is required."
            // errorStyle={styles.errorStyle}
          /><br />
          <TextField
            value={this.state.isAdmin}
            onChange={this.handleChange}
            type="text"
            name="isAdmin"
            hintText="Admin Rights? (true/false)"
            // errorText="This field is required."
            // errorStyle={styles.errorStyle}
          /><br />
          <TextField
            value={this.state.password}
            onChange={this.handleChange}
            type="text"
            name="password"
            hintText="Password"
            // errorText="This field is required."
            // errorStyle={styles.errorStyle}
          /><br />

          <FlatButton styles={'margin-bottom: 20px'} type="submit" label="Submit" primary={true} />
        </fieldset>
      </form>
    )
  }

}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit: (event) => {
      const firstName = event.target.firstName.value
      const lastName = event.target.lastName.value
      const email = event.target.email.value
      const city = event.target.city.value
      const state = event.target.state.value
      const zip = +event.target.zip.value
      const shippingAddress = event.target.shippingAddress.value
      let isAdmin = event.target.isAdmin.value
      if (!isAdmin) isAdmin = false
      const password = event.target.password.value
      const newUser = { firstName, lastName, email, city, state, zip, shippingAddress, isAdmin, password}
      dispatch(fetchUserThunk(newUser))

    }
  }
}

export default connect(null, mapDispatch)(AddNewUser)
