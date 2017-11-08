import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
const DELETE_USER = 'DELETE_USER';
const UPDATE_USER = 'UPDATE_USER';
const FETCH_USER = 'FETCH_USER';

/**
 * INITIAL STATE
 */
const defaultUsers = [];

/**
 * ACTION CREATORS
 */
const fetchAllUsers = users => ({type: FETCH_ALL_USERS, users});
const deleteUser = user => ({type: DELETE_USER, user});
const fetchUser = user => ({type: FETCH_USER, user})
const updateUser = user => ({type: UPDATE_USER, user});

/**
 * THUNK CREATORS
 */
export const fetchAllUsersThunk = () =>
  dispatch => {
    return axios.get('/api/users')
      .then(res => res.data)
      .then(users => dispatch(fetchAllUsers(users)))
      .catch(err => console.error(err))
  }

export const deleteUserThunk = (user) =>
  dispatch => {
    return axios.delete(`/api/users/${user.id}`)
      .then(() => {
        history.push(`/admin/users`)
        dispatch(deleteUser(user))
      })
      .catch(err => console.error(err))
  }

export const updateUserThunk = (user) =>
  dispatch => {
    return axios.put(`/api/users/${user.id}`, user)
      .then(res => res.data)
      .then(updatedUser => {
        dispatch(updateUser(updatedUser))
        history.push('/admin/users')
      })
      .catch(err => console.error(err))
  }

export const fetchUserThunk = (user) =>
  dispatch => {
    return axios.post(`/api/users/`, user)
      .then(res => res.data)
      .then(({user, bool}) => {
        if (bool) {
          dispatch(fetchUser(user));
        }
        history.push(`/admin/users`)
      })
      .catch(err => console.error(err))
  }

/**
* REDUCER
*/
export default function (state = defaultUsers, action) {
  switch (action.type) {

    case FETCH_ALL_USERS:
      return action.users;

    case FETCH_USER:
      return [...state, action.user];

    case DELETE_USER: {
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
