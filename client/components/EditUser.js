import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
import { updateUserThunk } from '../store'
import TextField from 'material-ui/TextField'
import { orange500, blue500 } from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'

class EditUser extends Component {

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

    const users = this.props.users
    const userId = +this.props.match.params.userId;
    const selectedUser = users.length ? users.find(user => user.id === userId) : {};

    return (
      <form name="UserForm" onSubmit={this.emptyState}>
        <fieldset>
          <h3>Update User:</h3>
          <label>First Name:</label>
          <TextField
            defaultValue={selectedUser.firstName}
            onChange={this.handleChange}
            type="text"
            name="firstName"
            hintText="First Name"
            // errorText="This field is required."
            // errorStyle={styles.errorStyle}
          /><br />
          <label>Last Name:</label>
          <TextField
            defaultValue={selectedUser.lastName}
            onChange={this.handleChange}
            type="text"
            name="lastName"
            hintText="Last Name"
            // errorText="This field is required."
            // errorStyle={styles.errorStyle}
          /><br />
          <label>E-mail:</label>
          <TextField
            defaultValue={selectedUser.email}
            onChange={this.handleChange}
            type="text"
            name="email"
            hintText="e-mail"
            errorText="This field is required."
            errorStyle={styles.errorStyle}
          /><br />
          <label>City:</label>
          <TextField
            defaultValue={selectedUser.city}
            onChange={this.handleChange}
            type="text"
            name="city"
            hintText="City"
            // errorText="This field is required."
            // errorStyle={styles.errorStyle}
          /><br />
          <label>State:</label>
          <TextField
            defaultValue={selectedUser.state}
            onChange={this.handleChange}
            type="text"
            name="state"
            hintText="State"
            // errorText="This field is required."
            // errorStyle={styles.errorStyle}
          /><br />
          <label>Zip:</label>
          <TextField
            defaultValue={selectedUser.zip}
            onChange={this.handleChange}
            type="text"
            name="zip"
            hintText="Zip Code"
            errorText="This field is required."
            errorStyle={styles.errorStyle}
          /><br />
          <label>Shipping Address:</label>
          <TextField
            defaultValue={selectedUser.shippingAddress}
            onChange={this.handleChange}
            type="text"
            name="shippingAddress"
            hintText="Shipping Address"
            // errorText="This field is required."
            // errorStyle={styles.errorStyle}
          /><br />
          <label>Admin Rights:</label>
          <TextField
            defaultValue={selectedUser.isAdmin}
            onChange={this.handleChange}
            type="text"
            name="isAdmin"
            hintText="Admin Rights? (true/false)"
            // errorText="This field is required."
            // errorStyle={styles.errorStyle}
          /><br />
          <label>Password:</label>
          <TextField
            defaultValue={selectedUser.password}
            onChange={this.handleChange}
            type="text"
            name="password"
            hintText="Password"
            // errorText="This field is required."
            // errorStyle={styles.errorStyle}
          /><br />

          <FlatButton styles={'margin-bottom: 20px'} type="submit" label="Create User" primary={true} />
        </fieldset>
      </form>
    )
  }

}

const mapStateToProps = (state) => ({
  users: state.adminUsers
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (event) => {
      const id = +ownProps.match.params.userId
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
      const updatedUser = { id, firstName, lastName, email, city, state, zip, shippingAddress, isAdmin, password}

      dispatch(updateUserThunk(updatedUser))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
