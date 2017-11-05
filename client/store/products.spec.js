
import { expect } from 'chai'
import { fetchAllProducts, addProduct } from './products'
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

  const initialState = { products: [], product: {} }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchAllProducts', () => {
    it('eventually dispatches the GET_ALL_PRODUCTS action', () => {
      const fakeProducts = [{ name: 'Ro', description: 'cool', price: '5', image: 'https://i.pinimg.com/736x/41/d9/ee/41d9eea837285880b6164b10b7e2e8a9--cool-fish-fishing.jpg' }, { name: 'Ro', description: 'cool', price: '5', image: 'https://i.pinimg.com/736x/41/d9/ee/41d9eea837285880b6164b10b7e2e8a9--cool-fish-fishing.jpg' }]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      return store.dispatch(fetchAllProducts())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_ALL_PRODUCTS')
          expect(actions[0].products).to.be.deep.equal(fakeProducts)
        })
    })
  })
  describe('addProduct', () => {
    it('eventually dispatches the CREATE_PRODUCT action', () => {
      const fakeProduct = { name: 'Ro', description: 'cool', price: '5', image: 'https://i.pinimg.com/736x/41/d9/ee/41d9eea837285880b6164b10b7e2e8a9--cool-fish-fishing.jpg' }
      mockAxios.onPost('/api/products').replyOnce(201, fakeProduct)
      return store.dispatch(addProduct(fakeProduct))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('CREATE_PRODUCT')
          expect(actions[0].product).to.be.deep.equal(fakeProduct)

        })
    })
  })

})
