import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

import user from '../components/user'
import item from './components/orderDetails';

const combinedReducers = combineReducers({
  user,
  item
});

export default createStore(combinedReducers, applyMiddleware(thunkMiddleware, createLogger()))
