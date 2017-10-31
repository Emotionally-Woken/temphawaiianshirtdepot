import React from 'react';
import {connect} from 'react-redux'
import {cart} from '../store'

function Cart(){

  return(
    <div>
    </div>
  )

}

const mapPropsToState = (state) => ({
  cart: state.cart
})

const mapDispatchToState = (dispatch) => ({

})

const CartContainer = connect(mapPropsToState)(Cart)
