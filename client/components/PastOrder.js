import React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import {Link} from 'react-router-dom'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';


export const PastOrder = ({orders}) => {
  return (
    <Paper>
      <List>
        <Subheader>PREVIOUS ORDERS</Subheader>
      {orders && orders.map(order =>
      <List key={order.id}>
        <ListItem
          primaryText= {`Order : #${order.id}`}
          containerElement={<Link to={`/order/${order.id}`}></Link>}
          secondaryText={
            <div>
              <span style={{color: darkBlack}}>{`${order.status}`}</span> --
              {`Total Cost: $${order.totalPrice}`}
              <p> {`${order.createdAt.slice(0,10)}`}</p>
            </div>
          }
          secondaryTextLines={2}
        />
        </List>
      )}
      </List>
    </Paper>
  )
}

const mapState = (state, ownProps)=>{

  return {
    orders: ownProps.orders.filter(order => order.status !== 'Active Cart')
  }
}

export default connect(mapState)(PastOrder)
