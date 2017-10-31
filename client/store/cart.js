import axios from 'axios';
import history from '../history';

//Action Types

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'

//Action Creators

const addToCartAction = orderDetail => ({type: ADD_TO_CART, orderDetail });
const removeFromCartAction = orderDetail => ({type: REMOVE_FROM_CART, orderDetail })
const changeQuantityAction = (orderDetail, delta) => ({type: CHANGE_QUANTITY, orderDetail, delta})


//Thunk Creators

export const changeQuantityThunk = (orderDetail, delta) =>
  dispatch => {
    dispatch(changeQuantityAction(orderDetail, delta))
  }


export const addToCartThunk = item =>
  dispatch => {
    const orderDetail = {}
    orderDetail.productId = item.id;
    orderDetail.price = item.price;
    orderDetail.quantity = 1;
    orderDetail.limit = item.quantity
    dispatch(addToCartAction(orderDetail));
    history.push('/cart');
}
export const removeFromCartThunk = orderDetail =>
  dispatch =>
    dispatch(removeFromCartAction(orderDetail));

//Reducer

export default function (state = [], action) {
  const newState = Array.from(state)
  switch (action.type) {
    case ADD_TO_CART:
      return [...newState, action.orderDetail]
    case REMOVE_FROM_CART:
      return newState.filter(orderDetail => orderDetail.productId !== action.item.id)
    case CHANGE_QUANTITY:
    return newState.map(orderDetail => {
      if (orderDetail.productId === action.orderDetail.productId) {
        action.delta === 'increment' ? orderDetail.quantity++ : orderDetail.quantity--
      }
      return orderDetail;
    })
    default:
      return state;
  }
}
