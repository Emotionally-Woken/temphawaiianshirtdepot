import axios from 'axios'
import history from '../history'


/**
 * ACTION TYPES
 */

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const UPDATE_SINGLE_ORDER = 'UPDATE_SINGLE_ORDER'

/**
 * ACTION CREATORS
 */

export const getAllOrders = (adminOrders) => ({ type: GET_ALL_ORDERS, adminOrders})

export const updateSingleOrder = (payload) => ({ type: UPDATE_SINGLE_ORDER,
payload})
/* THUNK CREATORS*/

export const fetchAllOrders = () =>
  dispatch =>
    axios.get(`/api/orders`)
      .then(res => res.data)
      .then(orders => dispatch(getAllOrders(orders)))
      .catch(console.error)


export const updateOrder = (order) =>
  dispatch =>
    axios.put(`/api/orders`, order)
      .then(res => res.data)
      .then(receivedOrder => {
        dispatch(updateSingleOrder(receivedOrder))
        history.push('/admin/orders')
      })
      .catch(console.error)
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.adminOrders
    case UPDATE_SINGLE_ORDER:
      return [...state, action.payload]
    default:
      return state
  }
}

