import {expect} from 'chai'
import {fetchSingleReview} from './reviews'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {reviews: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchSingleReview', () => {
    it('eventually dispatches the GET_SINGLE_REVIEW: action', () => {
      const fakeReviews = [{id: 1, reviewId: 10}, {id: 2, reviewId: 1}]
      mockAxios.onGet('/api/reviews/2').replyOnce(200, fakeReviews)
      return store.dispatch(fetchSingleReview(2))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_SINGLE_REVIEW')
          expect(actions[0].reviews).to.be.deep.equal(fakeReviews)
        })
    })
  })

})
