import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteUserThunk } from '../store'

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
export const AllUsers = ({users, me, handleRemoveUser}) => {

  console.log('XXXX', me);

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
              (
                <ListItem
                  key={user.id}
                  primaryText={`${user.firstName} ${user.lastName}`}
                  style={styles.root}>
                  <IconButton
                    tooltip="Font Icon"
                    disabled={me.id === user.id}
                    onClick={() => handleRemoveUser(user)}>
                    <FontIcon
                      className="material-icons"
                      style={styles.child}
                    >delete</FontIcon>
                  </IconButton>
                  <Link to={`/admin/users/${user.id}`}>
                    <IconButton tooltip="Font Icon" >
                      <FontIcon
                        className="material-icons"
                        style={styles.child}
                      >settings</FontIcon>
                    </IconButton>
                  </Link>
                </ListItem>
              )
            )
          }
        </List>
      </div>
  )
}

const mapStateToProps = (state) => ({
  users: state.adminUsers,
  me: state.user
})

const mapDispatchToProps = (dispatch) => ({
  handleRemoveUser (user) {
    dispatch(deleteUserThunk(user))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
