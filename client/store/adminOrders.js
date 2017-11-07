import axios from 'axios'
import history from '../history'


/**
 * ACTION TYPES
 */

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

/**
 * ACTION CREATORS
 */

export const getAllOrders = (adminOrders) => ({ type: GET_ALL_ORDERS, adminOrders})

/* THUNK CREATORS*/

export const fetchAllOrders = () =>
  dispatch =>
    axios.get(`/api/orders/all`)
      .then(res => res.data)
      .then(orders => dispatch(getAllOrders(orders)))
      .catch(console.error)
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.adminOrders
    default:
      return state
  }
}

