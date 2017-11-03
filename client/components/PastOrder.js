import React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper';

const PastOrder = ({orders}) => {
  return (
    <div>
      {orders && orders.map(order =>
        <div key={order.id}>
          <Paper>
           c
          </Paper>
        </div>)}
    </div>
  )
}

export default connect()(PastOrder)
