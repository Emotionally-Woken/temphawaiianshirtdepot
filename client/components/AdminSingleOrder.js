import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateOrder } from '../store'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton'

class AdminSingleOrder extends Component {
  constructor(props){
    super(props)
    this.state = {
      dropDownValue: this.props.order.status
    }
    this.handleDropDownChange = this.handleDropDownChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = () => {
    this.props.updateOrder({
      id: this.props.orderId,
      status: this.state.dropDownValue
    })
  };

  handleDropDownChange(event, idx, value){
    event.preventDefault()
    this.setState({
      dropDownValue: value
  });}


  render(){
    let order = this.props.order
  return (
    <div>
      {order &&
      <div>
        <div> Order Id: {order.id} </div>
        <div> Current Status: {order.status} </div>
        <DropDownMenu
          value={this.state.dropDownValue}
          onChange={this.handleDropDownChange} >
          <MenuItem value={'All'} primaryText="All" />
          <MenuItem value={'Active Cart'} primaryText="Active Cart" />
          <MenuItem value={'Created'} primaryText="Created" />
          <MenuItem value={'Processing'} primaryText="Processing" />
          <MenuItem value={'Canceled'} primaryText="Canceled" />
          <MenuItem value={'Completed'} primaryText="Completed" />
        </DropDownMenu>

        <FlatButton label="Submit" primary={true} onClick={this.handleSubmit}  />

      </div>
    }
    </div>
  )
  }
}

const mapState = (state, ownProps) => {
  return {
    orderId: ownProps.match.params.orderId,
    order: state.adminOrders.find(item => +item.id === +ownProps.match.params.orderId)
  }
}

const mapDispatch = { updateOrder }

export default connect(mapState, mapDispatch)(AdminSingleOrder)
