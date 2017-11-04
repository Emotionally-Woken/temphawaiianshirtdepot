import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'

/**
 * ACTION CREATORS
 */
const getAllProducts = products => ({ type: GET_ALL_PRODUCTS, products })
const createProduct = product => ({ type: CREATE_PRODUCT, product })

/* THUNK CREATORS*/

export const fetchAllProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res => res.data)
      .then(products => dispatch(getAllProducts(products)))
      .catch(err => console.log(err))

export const addProduct = product =>
  dispatch =>
    axios.post('/api/products', product)
      .then(res => res.data)
      .then(newProduct => {
        console.log("post thunk error")
        dispatch(createProduct(newProduct))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (products = [], action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [action.product, ...products]
    default:
      return products
  }
}
