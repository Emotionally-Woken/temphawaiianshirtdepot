import axios from 'axios'
import history from '../history'


/**
 * ACTION TYPES
 */

const GET_SELECT_ORDERS = 'GET_SELECT_ORDERS'

/**
 * ACTION CREATORS
 */

export const getSelectOrders = (orders) => ({ type: GET_SELECT_ORDERS, orders})

/* THUNK CREATORS*/

export const fetchSelectOrders = (userId) =>
  dispatch =>
    axios.get(`/api/orders/${userId}`)
      .then(res => res.data)
      .then(orders => dispatch(getSelectOrders(orders)))
      .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_SELECT_ORDERS:
      return action.orders //{user1: [{},{},{}]}, user2:[{},{},{}]}
    default:
      return state
  }
}

