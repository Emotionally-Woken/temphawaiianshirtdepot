import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products from './products'
import cart from './cart'
import reviews from './reviews'
import orders from './orders'
import adminOrders from './adminOrders'
import adminUsers from './adminUsers'

const reducer = combineReducers({user, cart, products, reviews, orders, adminOrders, adminUsers})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './cart'
export * from './reviews'
export * from './orders'
export * from './adminOrders'
export * from './adminUsers'
