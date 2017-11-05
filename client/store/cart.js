import axios from 'axios';
import history from '../history';
import {userOrderUpdate} from './index'

//Action Types

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const USER_LOGS_IN_ADD_CART = 'USER_LOGS_IN_ADD_CART'
const USER_LOGS_OUT_REMOVE_CART = 'USER_LOGS_OUT_REMOVE_CART'

//Action Creators

//initial state for testing only!!!
let localCart = JSON.parse(localStorage.getItem('cart'))

const initialState = localCart || {id: 0, orderDetails: []};

const addToCartAction = orderDetail => ({type: ADD_TO_CART, orderDetail });
export const removeFromCartAction = itemToRemove => ({type: REMOVE_FROM_CART, itemToRemove })
export const changeQuantityAction = (orderDetail) => ({type: CHANGE_QUANTITY, orderDetail})
export const userLogsInAddCartAction = (usersCart, orderId) => ({type: USER_LOGS_IN_ADD_CART, usersCart, orderId})
export const userLogsOutRemoveCartAction = () => ({type: USER_LOGS_OUT_REMOVE_CART})

//Thunk Creators

export const changeQuantityThunk = (orderDetail, delta) =>
  dispatch => {
    console.log('got here', orderDetail)
    orderDetail.quantity = delta === 'increment' ? orderDetail.quantity + 1 : orderDetail.quantity - 1
    console.log(orderDetail.quantity, 'now here')
    axios.put(`api/orderDetail/update/${orderDetail.orderId}/${orderDetail.productId}`, orderDetail)
    .then(() => {
      dispatch(changeQuantityAction(orderDetail, delta))
    })
  }

export const addToCartThunk = (item, cart) =>
  dispatch => {
    
    const orderDetail = {}
    orderDetail.productId = item.id;
    orderDetail.price = item.price;
    orderDetail.quantity = 1;
    orderDetail.orderId = cart.id;
    if (cart.id) {
      console.log(orderDetail, 'OD in add to cart thunk')
      axios.post(`api/orderDetail/${cart.id}/new`, orderDetail)
      .then(res => {
        const updatedCart = Object.assign({}, cart)
        updatedCart.orderDetails = [...updatedCart.orderDetails, res.data]
        console.log(updatedCart, 'updatedCart')
        console.log(res.data, 'res data')
        dispatch(userOrderUpdate(updatedCart))
      })
      .catch()
    }
      dispatch(addToCartAction(orderDetail));
      history.push('/cart');
}

const createBulkOrderDetailsThunk = (cart) => 
  dispatch => {
    axios.post(`/api/orderDetail/bulkNew`, cart)
    .catch()
  }

export const userLogsInCreateCartThunk = user =>
  dispatch => {
    axios.post(`/api/orders/${user.id}/create`, user)
    .then(res => {
      const newCart = res.data
      console.log(localStorage, 'in logs in create cart thunk')
      localCart = JSON.parse(localStorage.getItem('cart'))
      localCart.id = newCart.id
      dispatch(userLogsInAddCartAction([], newCart.id))
      if(localCart.orderDetails.length) dispatch(createBulkOrderDetailsThunk(localCart))
      localStorage.setItem('cart', JSON.stringify({ id: 0, orderDetails: [] }))
    })
    .catch()
  }

//Reducer

export default function (state = initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case ADD_TO_CART:
      newState.orderDetails = [...newState.orderDetails, action.orderDetail]
      return newState
    case REMOVE_FROM_CART:
      newState.orderDetails = newState.orderDetails.filter( orderDetail => orderDetail.productId !== action.itemToRemove.productId)
      return newState
    case CHANGE_QUANTITY:
      newState.orderDetails = newState.orderDetails.map( orderDetail => {
        const newOrderDetail = {...orderDetail}
         return newOrderDetail.productId === action.orderDetail.productId ? action.orderDetail : newOrderDetail
          // action.delta === 'increment' ? newOrderDetail.quantity++ : newOrderDetail.quantity--    
      })
      return newState;
    case USER_LOGS_IN_ADD_CART:
      const concattedCarts = {}
      newState.orderDetails.concat(action.usersCart).forEach(orderDetail => {
        if (!concattedCarts[orderDetail.productId]) {
          concattedCarts[orderDetail.productId] = orderDetail
        }
        else concattedCarts[orderDetail.productId].quantity += concattedCarts[orderDetail.productId].quantity
      })

      newState.orderDetails = Object.keys(concattedCarts).map(i => {
        return concattedCarts[i]
      })
      newState.id = action.orderId
      return newState
    case USER_LOGS_OUT_REMOVE_CART:
      return {id: 0, orderDetails: []}
    default:
      return state;
  }
}




// return Array.from(concattedCarts)