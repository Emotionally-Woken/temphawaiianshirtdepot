import React, { Component } from 'react'
import { connect } from 'react-redux'
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

class AdminProducts extends Component {

  render(){
    let { products } = this.props;

    return(
      <div>
        <h3>All Products</h3>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Title</TableHeaderColumn>
            <TableHeaderColumn>Price</TableHeaderColumn>
            <TableHeaderColumn>Inventory</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            products && products.map(product => (
              <TableRow key={product.id} >
               <Link to={`/editProduct/${product.id}`}><TableRowColumn>{product.id}</TableRowColumn></Link>
                <TableRowColumn>{product.title}</TableRowColumn>
                <TableRowColumn>{`$${product.price}`}</TableRowColumn>
                <TableRowColumn>{product.quantity}</TableRowColumn>
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
    products: state.products
  }
}


export default connect(MapState)(AdminProducts)
