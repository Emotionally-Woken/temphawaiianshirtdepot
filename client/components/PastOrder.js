import React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import {Link} from 'react-router-dom'

const PastOrder = ({orders}) => {
  return (
    <Paper>
      <List>
        <Subheader>PREVIOUS ORDERS</Subheader>
      {orders && orders.map(order =>
        <ListItem key={order.id}
          primaryText= {`Order_Id: ${order.id}`}
          secondaryText={`Order_Status: ${order.status}`}
          containerElement={<Link to={`/order/${order.id}`}></Link>}
        />
      )}
      </List>
    </Paper>
  )
}

export default connect()(PastOrder)
