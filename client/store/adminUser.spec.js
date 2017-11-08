/* global describe beforeEach afterEach it */

import { expect } from 'chai'
import { fetchAllUsersThunk, deleteUserThunk, updateUserThunk, fetchUserThunk } from './adminUsers'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('adminUser store thunk creators', () => {
  let store
  let mockAxios

  const initialState = { users: [] }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchAllUsers', () => {
    it('eventually dispatches the FETCH_ALL_USERS action', () => {
      const fakeUsers = [{ email: 'Barkley' }, { email: 'Titan' }]
      mockAxios.onGet('/api/users').replyOnce(200, fakeUsers)
      return store.dispatch(fetchAllUsersThunk())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('FETCH_ALL_USERS')
          expect(actions[0].users).to.be.deep.equal(fakeUsers)
        })
    })
  })

})
