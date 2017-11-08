import axios from 'axios'
import history from '../history'


/**
 * ACTION TYPES
 */

const GET_SELECT_ORDERS = 'GET_SELECT_ORDERS'
const CREATE_ORDER = 'CREATE_ORDER'

/**
 * ACTION CREATORS
 */

export const getSelectOrders = (orders) => ({ type: GET_SELECT_ORDERS, orders})
export const createOrders = (order) => ({type: CREATE_ORDER, payload: order})

/* THUNK CREATORS*/

export const createOrderThunk = (order) => 
  dispatch => 
  axios.put(`/api/orders/createdOrder/`, {order})
  .then(res => res.data)
  .then(createdOrder => dispatch(createOrders(createdOrder)))
  .catch(console.error)

export const fetchSelectOrders = (userId) =>
  dispatch =>
    axios.get(`/api/orders/${userId}`)
      .then(res => res.data)
      .then(orders => dispatch(getSelectOrders(orders)))
      .catch(console.error)
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_SELECT_ORDERS:
      return action.orders
    case CREATE_ORDER:
      const newState = [...state]
      newState.map(order => order.id === action.payload.id ? action.payload : order)
      return newState
    default:
      return state
  }
}

