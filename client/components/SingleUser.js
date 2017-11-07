import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserThunk, deleteUserThunk, updateUserThunk, fetchAllUsersThunk} from '../store'

export const SingleUser = ({match, users}) => {

 const userId = match.params.userId;

  let selectedUser;
  if (users) {
    selectedUser = users.find(user => user.id === +userId)
  }

  return (
    <div>


    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    users: state.adminUsers
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleGetAllUsers () {
    dispatch(fetchAllUsersThunk())
  },
  handleGetUser (user) {
    dispatch(fetchUserThunk(user))
  },
  handleRemoveUser (user) {
    dispatch(deleteUserThunk(user))
  },
  handleUpdateUser (user) {
    dispatch(updateUserThunk(user))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)

// <IconButton tooltip="Font Icon" >
// <FontIcon
//   className="material-icons"
//   style={styles.child}
//   onClick={() => handleUpdateUser(user)}
// >settings</FontIcon>
// </IconButton>
