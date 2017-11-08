import axios from 'axios'
import history from '../history'
import {userLogsOutRemoveCartAction, userLogsInAddCartThunk, userLogsInCreateCartThunk} from './index'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => {
        dispatch(getUser(res.data || defaultUser))
        if (res.data.id) {
          const userCart = res.data.orders.find(order => order.status === 'Active Cart')
          if (userCart) dispatch(userLogsInAddCartThunk(userCart.orderDetails, userCart.id))
          else dispatch(userLogsInCreateCartThunk(res.data))
        }
        }
      )
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
        const userCart = res.data.orders.find(order => order.status === 'Active Cart')
        userCart ? dispatch(userLogsInAddCartThunk(userCart.orderDetails, userCart.id)) : dispatch(userLogsInCreateCartThunk(res.data))
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
    default:
      return state
  }
}
