import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUserThunk, deleteUserThunk, updateUserThunk, fetchAllUsersThunk} from '../store'

export const SingleUser = ({match, users}) => {

 const userId = +match.params.userId;


  const selectedUser = users.find(user => user.id === userId)

  if (users.length) {
    return (
      <div className="container">

        <h4>{selectedUser.firstName}
          <Link to={`/users/${selectedUser.id}/edit`}>
            <i className="fa fa-cog" aria-hidden="true" />
          </Link>
        </h4>

        <h4>{selectedUser.lastName}
          <Link to={`/users/${selectedUser.id}/editname`}>
            <i className="fa fa-cog" aria-hidden="true" />
          </Link>
        </h4>


      </div>
    )
  } else {
      return (<div>Loading...<i className="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true" /></div>)
  }
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
