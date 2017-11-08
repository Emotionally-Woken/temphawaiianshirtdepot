import React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import {Link} from 'react-router-dom'
import {darkBlack} from 'material-ui/styles/colors';


export const PastOrder = ({orders}) => {

  let selectedOrders
  if(orders && orders.length){
    selectedOrders = orders.filter(order => order.status !== 'Active Cart')
  }

  return (
    <Paper>
      <List>
        <Subheader>PREVIOUS ORDERS</Subheader>
      {selectedOrders && selectedOrders.map(order =>
      <List key={order.id}>
        <ListItem
          primaryText= {`Order : #${order.id}`}
          containerElement={<Link to={`/order/${order.id}`} />}
          secondaryText={
            <div>
              <span style={{color: darkBlack}}>{`${order.status}`}</span> --
              {`Total Cost: $${order.totalPrice}`}
              <p> {`${order.createdAt.slice(0, 10)}`}</p>
            </div>
          }
          secondaryTextLines={2}
        />
        </List>)
      )}
      </List>
    </Paper>
  )
}

const mapState = (state, ownProps) => {

  return {
    orders: ownProps.orders
  }
}

export default connect(mapState)(PastOrder)
