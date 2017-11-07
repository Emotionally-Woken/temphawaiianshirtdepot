import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import PastOrder from './PastOrder'
import {fetchSelectOrders} from '../store/orders'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount(){
    this.props.loadInitialData()
  }

  render(){
    const {email, orders, isAdmin} = this.props

    return (
      <div>
        <h3>Welcome, {email}</h3>
        <div>
          { isAdmin &&
          <div>
            <Link to={'/admin/orders'}><RaisedButton label={'User Management'}/></Link>
            <Link to={'/admin/products'}><RaisedButton label={'Product Management'}/></Link>
            <Link to={'/admin/orders'}><RaisedButton label={'Order Management'}/></Link>
          </div>
          }
        </div>
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
    orders: state.orders,
    isAdmin: state.user.isAdmin
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
