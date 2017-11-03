import React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper'
import SingleOrderDetail from './SingleOrderDetail'

const SingleOrder = ({orders, userId})=>{
  return (
    <div>
      <Paper>
       <div>
        {orders && orders.map(order => (
          <div key={order.id}>{order.orderDetails.map(detail => (
            <div key={detail.id}>
            <SingleOrderDetail userId={userId} detail={detail}/>
            </div>
            ))}</div>
        ))}
        </div>
      </Paper>
    </div>
  )
}

const mapState = (state, ownProps)=>{
  let userId = state.user.id
  return {
    orderId: ownProps.match.params.orderId,
    orders: state.orders[userId],
    userId: userId
  }
}
export default connect(mapState)(SingleOrder)
