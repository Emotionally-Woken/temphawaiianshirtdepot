import React from 'react';
import { connect } from 'react-redux'
import { cart, changeQuantityThunk } from '../store'

function Cart(props) {
  const { cart, items } = props;

  return (
    <div>
      {cart.map(orderDetail => {
        const item = items.find(item => item.id === orderDetail.productId)
        let disabledDecrement = item.quantity === 1;
        let disabledIncrement = item.quantity === orderDetail.quantity
        return (<div key={item.id}>
          <img src={item.image} />
          <h3>{item.title}</h3>
          <p>{orderDetail.quatity}</p>
          <i className="fa fa-plus-square" aria-hidden="true" disabled={disabledIncrement} onClick={() => handleAmountChange(orderDetail, 'increment')} />
          <i className="fa fa-minus-square" aria-hidden="true" disabled={disabledDecrement} onClick={() => handleAmountChange(orderDetail, 'decrement')} />
        </div>)
      })}
    </div>
  )

}

const mapPropsToState = (state) => ({
  cart: state.cart,
  products: state.products
})

const mapDispatchToState = (dispatch) => ({
  handleAmountChange: (orderDetail, delta) => {
    dispatch(changeQuantityThunk(orderDetail, delta))
  }
})

const CartContainer = connect(mapPropsToState, mapDispatchToState)(Cart)
