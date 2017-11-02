import axios from 'axios';
import history from '../history';

//Action Types

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'

//Action Creators

//initial state for testing only!!!

const initialState = [{
  orderId: 1,
  quantity: 1,
  productId: 2,
  price: 10.00
}, {
  orderId: 2,
  quantity: 1,
  productId: 1,
  price: 10.00
  }, {
    orderId: 3,
    quantity: 1,
    productId: 3,
    price: 10.00
  }]

// const initialState = []

const addToCartAction = orderDetail => ({type: ADD_TO_CART, orderDetail });
export const removeFromCartAction = itemToRemove => ({type: REMOVE_FROM_CART, itemToRemove })
export const changeQuantityAction = (orderDetail, delta) => ({type: CHANGE_QUANTITY, orderDetail, delta})

//Thunk Creators


export const addToCartThunk = item =>
  dispatch => {
    const orderDetail = {}
    orderDetail.productId = item.id;
    orderDetail.price = item.price;
    orderDetail.quantity = 1;
    dispatch(addToCartAction(orderDetail));
    history.push('/cart');
}

//Reducer

export default function (state = initialState, action) {
  const newState = Array.from(state)
  switch (action.type) {
    case ADD_TO_CART:
      return [...newState, action.orderDetail]
    case REMOVE_FROM_CART:
      return newState.filter(orderDetail => orderDetail.productId !== action.itemToRemove.productId)
    case CHANGE_QUANTITY:
      return newState.map(orderDetail => {
      const newOrderDetail = {...orderDetail}
      if (newOrderDetail.productId === action.orderDetail.productId) {
        action.delta === 'increment' ? newOrderDetail.quantity++ : newOrderDetail.quantity--
      }
      return newOrderDetail;
      })
    default:
      return state;
  }
}
