import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserThunk, removeUserThunk, updateUserThunk, getAllUsersThunk} from '../store'

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
          {users && users.map(user =>
            (<ListItem
              key={user.id}
              primaryText={`${user.firstName} ${user.lastName}`}
            />)
          )}
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
    dispatch(getAllUsersThunk())
  },
  handleGetUser (user) {
    dispatch(getUserThunk(user))
  },
  handleRemoveUser (user) {
    dispatch(removeUserThunk(user))
  },
  handleUpdateUser (user) {
    dispatch(updateUserThunk(user))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
