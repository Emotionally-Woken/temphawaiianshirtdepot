import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';
const GET_USER = 'GET_USER';

/**
 * INITIAL STATE
 */
const defaultUsers = [];

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({type: GET_ALL_USERS, users});
const removeUser = user => ({type: REMOVE_USER, user});
const getUser = user => ({type: GET_USER, user})
const updateUser = user => ({type: UPDATE_USER, user});

/**
 * THUNK CREATORS
 */
export const getAllUsersThunk = () =>
  dispatch => {
    axios.get('/api/users')
      .then(res => res.data)
      .then(users => dispatch(getAllUsers(users)))
      .catch(err => console.error(err))
  }

export const removeUserThunk = (user) =>
  dispatch => {
    axios.delete(`/api/users/${user.id}`)
      .then(() => {
        history.push(`/users`)
        dispatch(removeUser(user))
      })
      .catch(err => console.error(err))
  }

export const updateUserThunk = (user) =>
  dispatch => {
    axios.put(`/api/users/${user.id}`, user)
      .then(res => res.data)
      .then(updatedUser => {
        dispatch(updateUser(updatedUser))
        history.push(`/users/${user.id}`)
      })
      .catch(err => console.error(err))
  }

export const getUserThunk = (user) =>
  dispatch => {
    axios.post(`/api/users/`, user)
      .then(res => res.data)
      .then(({user, bool}) => {
        if (bool) {
          dispatch(getUser(user));
        }
        history.push(`/users/${user.id}`)
      })
      .catch(err => console.error(err))
  }

/**
* REDUCER
*/
export default function (state = defaultUsers, action) {
  switch (action.type) {

    case GET_ALL_USERS:
      return action.users;

    case GET_USER:
      return [...state, action.user];

    case REMOVE_USER: {
      const filteredUserArr = state.filter(user => user.id !== action.user.id);
      return filteredUserArr;
    }

    case UPDATE_USER: {
      const updateUserArr = state.map(user => {
        if (user.id === action.user.id) {
          return action.user;
        }
        return user;
      })
      return updateUserArr;
    }

    default:
      return state;
  }
}
