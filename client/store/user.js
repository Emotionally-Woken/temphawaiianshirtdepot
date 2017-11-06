import axios from 'axios'
import history from '../history'
import {userLogsOutRemoveCartAction, userLogsInAddCartThunk, userLogsInCreateCartThunk} from './index'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const USER_ORDER_UPDATE = 'USER_ORDER_UPDATE'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
export const userOrderUpdate = cart => ({type: USER_ORDER_UPDATE, cart})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => {
        dispatch(getUser(res.data || defaultUser))
        if (res.data.id) {
          const userCart = res.data.orders.find(order => order.status === 'Created')
          if (userCart) dispatch(userLogsInAddCartThunk(userCart.orderDetails, userCart.id))
        }
        }
      )
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        console.log('this is a sign in event!')
        dispatch(getUser(res.data))
        const userCart = res.data.orders.find(order => order.status === 'Created')
        console.log(userCart, 'User cart XXXXXX')
        userCart ? dispatch(userLogsInAddCartThunk(userCart.orderDetails, userCart.id)) : dispatch(userLogsInCreateCartThunk(res.data))
        history.push('/home')
      })
      .catch(error =>
        dispatch(getUser({error})))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        dispatch(userLogsOutRemoveCartAction())
        localStorage.setItem('cart', JSON.stringify({ id: 0, orderDetails: [] }))
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case USER_ORDER_UPDATE:
      const newState = Object.assign({}, state)
      newState.orders = action.cart
      return newState
    default:
      return state
  }
}
