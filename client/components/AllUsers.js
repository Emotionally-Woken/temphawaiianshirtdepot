import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */

export const AllUsers = (props) => {

}

const mapStateToProps = (state) => ({
  users: state.users
})

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
