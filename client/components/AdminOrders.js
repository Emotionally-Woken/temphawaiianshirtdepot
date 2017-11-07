import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllOrders, updateOrder } from '../store'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom'

class AdminOrders extends Component {
  constructor(){
    super()
    this.state = {value: 'All'}
  }

  componentDidMount(){
    this.props.loadInitialData()
  }

  handleChange = (event, index, value) => this.setState({value});

  render(){
    let { orders } = this.props;
    orders =((this.state.value === 'All') ? this.props.orders :
      orders.filter(order => order.status === this.state.value))


    return(
      <div>
        <h3>All Orders</h3>
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>User ID</TableHeaderColumn>
            <TableHeaderColumn>
              <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                <MenuItem value={'All'} primaryText="All" />
                <MenuItem value={'Active Cart'} primaryText="Active Cart" />
                <MenuItem value={'Created'} primaryText="Created" />
                <MenuItem value={'Processing'} primaryText="Processing" />
                <MenuItem value={'Canceled'} primaryText="Canceled" />
                <MenuItem value={'Completed'} primaryText="Completed" />
              </DropDownMenu>
            </TableHeaderColumn>
            <TableHeaderColumn>Modify</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            orders && orders.map(order => (
              <TableRow key={order.id}>
                <TableRowColumn>{order.id}</TableRowColumn>
                <TableRowColumn>{order.userId}</TableRowColumn>
                <TableRowColumn>{order.status}</TableRowColumn>
                <TableRowColumn><Link to={`/admin/orders/${order.id}`}>Edit Order Status</Link></TableRowColumn>
              </TableRow>
            ))
          }
          </TableBody>
      </Table>
      </div>
    )
  }

}

const MapState = (state) => {
  return {
    orders: state.adminOrders
  }
}

const MapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchAllOrders())
    }
  }
}

export default connect(MapState, MapDispatch)(AdminOrders)
