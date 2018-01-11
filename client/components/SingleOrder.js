import React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper'
import SingleOrderDetail from './SingleOrderDetail'

const SingleOrder = ({userId, orderId, orders}) => {
  let order
  if (orders){
    order = orders.find(singleOrder => singleOrder.id === orderId)
  }

  return (
    <div>
      <Paper className='singleOrder'>
        <div>
          {order && order.orderDetails.map(detail => (
              <div key={detail.id}>
                <SingleOrderDetail userId={userId} detail={detail} />
              </div>
              ))}
        </div>
      </Paper>
    </div>
  )
}

const mapState = (state, ownProps) => {
  let userId = state.user.id
  return {
    orderId: +ownProps.match.params.orderId,
    orders: state.orders,
    userId: userId
  }
}
export default connect(mapState)(SingleOrder)
