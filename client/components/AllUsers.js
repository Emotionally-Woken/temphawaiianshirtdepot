import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserThunk, deleteUserThunk, updateUserThunk, fetchAllUsersThunk} from '../store'

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

/**
 * COMPONENT
 */
export const AllUsers = ({users}) => {

  return (
      <div>
        <List>
          <Subheader>Site Users</Subheader>
          {
            users.map(user =>
            (<ListItem
              key={user.id}
              primaryText={`${user.firstName} ${user.lastName}`}
            />))
          }
        </List>
      </div>
  )
}
//leftAvatar={<Avatar src="images/ok-128.jpg" />}
//rightIcon={<CommunicationChatBubble />}
const mapStateToProps = (state) => ({
  users: state.adminUsers
})

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

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
