/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchSelectOrders} from './orders'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {orders: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchSelectOrders', () => {
    it('eventually dispatches the GET_SELECT_ORDERS action', () => {
      const fakeOrders = [{id:1, userId:2}, {id: 3, userId:2}]
      mockAxios.onGet('/api/orders/2').replyOnce(200, fakeOrders)
      return store.dispatch(fetchSelectOrders(2))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_SELECT_ORDERS')
          expect(actions[0].orders).to.be.deep.equal(fakeOrders)
        })
    })
  })

})
