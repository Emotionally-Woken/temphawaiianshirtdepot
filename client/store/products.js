import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

/**
 * ACTION CREATORS
 */
const getAllProducts = products => ({ type: GET_ALL_PRODUCTS, products })
const createProduct = product => ({ type: CREATE_PRODUCT, product })
const updateProduct = product => ({ type: UPDATE_PRODUCT, product })

/* THUNK CREATORS*/

export const fetchAllProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res => res.data)
      .then(products => dispatch(getAllProducts(products)))
      .catch(err => console.log(err))

export const addProduct = (product) =>
  (dispatch) =>
    axios.post('/api/products', product)
      .then(res => res.data)
      .then(newProduct => {
         dispatch(createProduct(newProduct))
         history.push(`/item/${newProduct.id}`)
      })
      .catch(err => console.log(err))

export const changeProduct = (id, product) =>
    dispatch =>
      axios.put(`/api/products/${id}`, product)
        .then(res =>res.data)
        .then(updatedProduct => {
           dispatch(updateProduct(updatedProduct))
           history.push(`/item/${id}`)

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
    case UPDATE_PRODUCT:
      return products.map(product => (
        action.product.id === product.id ? action.product : product
      ))
    default:
      return products
  }
}
