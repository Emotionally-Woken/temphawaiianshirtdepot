import React from 'react';
import {connect} from 'react-redux'
import {cart} from '../store'

function Cart(props){
  const {cart} = props;

  return(
    <div>
      {cart.map(orderDetail => {
        return(<div key={orderDetail.productId}>
        <img src={orderDetail.image} />
        </div>)
      })}
    </div>
  )

}

const mapPropsToState = (state) => ({
  cart: state.cart
})

const mapDispatchToState = (dispatch) => ({

})

const CartContainer = connect(mapPropsToState)(Cart)
