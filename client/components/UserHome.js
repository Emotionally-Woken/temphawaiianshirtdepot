import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import PastOrder from './PastOrder'
import {fetchSelectOrders} from '../store/orders'
/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount(){
    this.props.loadInitialData()
  }

  render(){
    const {email, orders} = this.props

    return (
      <div>
        <h3>Welcome, {email}</h3>
        <div>
          <PastOrder orders={orders}/>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
let userId;
const mapState = (state) => {
  userId = state.user.id
  return {
    email: state.user.email,
    orders: state.orders[userId]
  }
}

const mapDispatch = (dispatch) => {
  return {
      loadInitialData () {
        dispatch(fetchSelectOrders(userId))
      }
    }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
