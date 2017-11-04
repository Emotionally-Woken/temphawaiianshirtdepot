import axios from 'axios';
import history from '../history';

//Action Types

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const USER_LOGS_IN_ADD_CART = 'USER_LOGS_IN_ADD_CART'
const USER_LOGS_OUT_REMOVE_CART = 'USER_LOGS_OUT_REMOVE_CART'

//Action Creators

//initial state for testing only!!!
//let localCart = JSON.parse(localStorage.getItem('cart'))

const initialState = []//localCart || [];

const addToCartAction = orderDetail => ({type: ADD_TO_CART, orderDetail });
export const removeFromCartAction = itemToRemove => ({type: REMOVE_FROM_CART, itemToRemove })
export const changeQuantityAction = (orderDetail, delta) => ({type: CHANGE_QUANTITY, orderDetail, delta})
export const userLogsInAddCartAction = (usersCart) => ({type: USER_LOGS_IN_ADD_CART, usersCart})
export const userLogsOutRemoveCartAction = () => ({type: USER_LOGS_OUT_REMOVE_CART})

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
    case USER_LOGS_IN_ADD_CART:
      const concattedCarts = {}
      newState.concat(action.usersCart).forEach(orderDetail => {
        if (!concattedCarts[orderDetail.productId]) {
          concattedCarts[orderDetail.productId] = orderDetail
        }
        else concattedCarts[orderDetail.productId].quantity += concattedCarts[orderDetail.productId].quantity
      })

      return Object.keys(concattedCarts).map(i => {
        return concattedCarts[i]
      })
    case USER_LOGS_OUT_REMOVE_CART:
      return []
    default:
      return state;
  }
}




// return Array.from(concattedCarts)