import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserThunk, deleteUserThunk, updateUserThunk, fetchAllUsersThunk} from '../store'

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  root: {
    display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around'
  },
  child: {
    dislpay: 'flex'
  }
}

/**
 * COMPONENT
 */
export const AllUsers = ({users, handleUpdateUser, handleGetUser, handleGetAllUsers, handleRemoveUser}) => {

  return (
      <div>
        <div>
        <Subheader>Add User</Subheader>
          <Link to="/admin/users/createUser">
            <IconButton tooltip="Font Icon" >
              <FontIcon
                className="material-icons"
                style={styles.child}
                // onClick={handleGetUser}
              >add_box</FontIcon>
            </IconButton>
          </Link>
        </div>
        <List>
          <Subheader>Site Users</Subheader>
          {
            users.map(user =>
              (<Link key={user.id} to={`/admin/users/${user.id}`}>
                <ListItem
                  primaryText={`${user.firstName} ${user.lastName}`}
                  style={styles.root}>
                  <IconButton tooltip="Font Icon" >
                    <FontIcon
                      className="material-icons"
                      style={styles.child}
                      onClick={() => handleRemoveUser(user)}
                    >delete</FontIcon>
                  </IconButton>
                </ListItem>
              </Link>)
            )
          }
        </List>
      </div>
  )
}

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
