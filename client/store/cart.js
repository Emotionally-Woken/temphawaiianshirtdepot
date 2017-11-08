import axios from 'axios';
import history from '../history';

//Action Types

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const USER_LOGS_IN_ADD_CART = 'USER_LOGS_IN_ADD_CART'
const USER_LOGS_OUT_REMOVE_CART = 'USER_LOGS_OUT_REMOVE_CART'

//Action Creators


const localCart = () => JSON.parse(localStorage.getItem('cart'))
const resetLocalCart = () => localStorage.setItem('cart', JSON.stringify({ id: 0, orderDetails: [] }))

const initialState = localCart() || {id: 0, orderDetails: []};

const addToCartAction = orderDetail => ({type: ADD_TO_CART, orderDetail });
export const removeFromCartAction = itemToRemove => ({type: REMOVE_FROM_CART, itemToRemove })
export const changeQuantityAction = (orderDetail) => ({type: CHANGE_QUANTITY, orderDetail})
export const userLogsInAddCartAction = (usersCartOrderDetails, orderId) => ({ type: USER_LOGS_IN_ADD_CART, usersCartOrderDetails, orderId})
export const userLogsOutRemoveCartAction = () => ({type: USER_LOGS_OUT_REMOVE_CART})

//Thunk Creators

//write a thunk for when user has a cart and stuff in local state, clearing local storage.

const uniqueToBulkAddDuplicateToChangeQuantity = (usersCartOrderDetails, cartToAdd) => {
  const uniqueForBulkToAdd = []
  const duplicatesForChangeQuantity = []
  const productsInUsersCart = usersCartOrderDetails.map(orderDetail => {
    return orderDetail.productId
  })
  cartToAdd.orderDetails.forEach(orderDetail => {
    productsInUsersCart.includes(orderDetail.productId) ? duplicatesForChangeQuantity.push(orderDetail) : uniqueForBulkToAdd.push(orderDetail)
  })

  return [duplicatesForChangeQuantity, uniqueForBulkToAdd]

}

const createBulkOrderDetailsThunk = (cart) =>
  dispatch => {
    axios.post(`/api/orderDetail/localCart`, cart)
      .catch(console.error)
  }

const changeBulkQuantityThunk = (cart) =>
  dispatch => {
    axios.put('/api/orderDetail/quantities', cart)
    .catch(console.error)
  }


export const userLogsInAddCartThunk = (usersCartOrderDetails, orderId) =>
  dispatch => {
   
    const bulkAdd = {id: orderId}
    const changeQuantity = {id: orderId}
    const cartToAdd = localCart()
    const [forChangeQuantityOrderDetails, forBulkAddOrderDetails] = uniqueToBulkAddDuplicateToChangeQuantity(usersCartOrderDetails, cartToAdd)
   
    bulkAdd.orderDetails = forBulkAddOrderDetails
    changeQuantity.orderDetails = forChangeQuantityOrderDetails
   
    dispatch(userLogsInAddCartAction(usersCartOrderDetails, orderId))
    if (bulkAdd.orderDetails.length) dispatch(createBulkOrderDetailsThunk(bulkAdd))
    if (changeQuantity.orderDetails.length) dispatch(changeBulkQuantityThunk(changeQuantity))
   
    resetLocalCart()
  }


export const removeFromCartThunk = orderDetail =>
  dispatch => {
    axios.delete(`api/orderDetail/${orderDetail.orderId}/${orderDetail.productId}`)
    .then(() => {
      dispatch(removeFromCartAction(orderDetail))
    })
    .catch(console.error)
  }

export const changeQuantityThunk = (orderDetail, delta) =>
  dispatch => {
    
    orderDetail.quantity = delta === 'increment' ? orderDetail.quantity + 1 : orderDetail.quantity - 1
    
    dispatch(changeQuantityAction(orderDetail))
    
    if (orderDetail.orderId) {
    axios.put(`api/orderDetail/${orderDetail.orderId}/${orderDetail.productId}`, orderDetail)
    .catch(console.error)
    }
  }

export const addToCartThunk = (item, cart) =>
  dispatch => {
    
    const orderDetail = {}
    orderDetail.productId = item.id;
    orderDetail.price = item.price;
    orderDetail.quantity = 1;
    orderDetail.orderId = cart.id;
    if (cart.id) {
  
      axios.post(`api/orderDetail/`, orderDetail)
      .then(res => {
        const updatedCart = Object.assign({}, cart)
        updatedCart.orderDetails = [...updatedCart.orderDetails, res.data]
      })
      .catch()
    }
      dispatch(addToCartAction(orderDetail));
      history.push('/cart');
}

export const userLogsInCreateCartThunk = user =>
  dispatch => {
    axios.post(`/api/orders/${user.id}/create`, user)
    .then(res => {
      const newCart = res.data
      const cartToAdd = localCart()
      cartToAdd.id = newCart.id
      dispatch(userLogsInAddCartAction([], newCart.id))
      if (cartToAdd.orderDetails.length) dispatch(createBulkOrderDetailsThunk(cartToAdd))
      resetLocalCart()
    })
    .catch()
  }

//Reducer

const updateTotalPrice = (array) => {
  let totalPrice = array.reduce((acc, item) => {
    return acc += (item.price * item.quantity)
  }, 0)
  return totalPrice.toFixed(2)
}

export default function (state = initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case ADD_TO_CART:
      action.orderDetail.orderId = newState.id
      newState.orderDetails = [...newState.orderDetails, action.orderDetail]
      newState.totalPrice = updateTotalPrice(newState.orderDetails)
      return newState
    case REMOVE_FROM_CART:
      newState.orderDetails = newState.orderDetails.filter( orderDetail => orderDetail.productId !== action.itemToRemove.productId)
      newState.totalPrice = updateTotalPrice(newState.orderDetails)
      return newState
    case CHANGE_QUANTITY:
      newState.orderDetails = newState.orderDetails.map( orderDetail => {
        const newOrderDetail = {...orderDetail}
         return newOrderDetail.productId === action.orderDetail.productId ? action.orderDetail : newOrderDetail
      })
      newState.totalPrice = updateTotalPrice(newState.orderDetails)
      return newState;
    case USER_LOGS_IN_ADD_CART:
      newState.id = action.orderId
      const concattedCarts = {}
      newState.orderDetails.concat(action.usersCartOrderDetails).forEach(orderDetail => {
        const newOrderDetail = {...orderDetail}
        newOrderDetail.orderId = newState.id
        if (!concattedCarts[newOrderDetail.productId]) {
          concattedCarts[newOrderDetail.productId] = newOrderDetail
        }
        else concattedCarts[newOrderDetail.productId].quantity += newOrderDetail.quantity
      })

      newState.orderDetails = Object.keys(concattedCarts).map(i => {
        return concattedCarts[i]
      })
      newState.totalPrice = updateTotalPrice(newState.orderDetails)
      return newState
    case USER_LOGS_OUT_REMOVE_CART:
      return {id: 0, orderDetails: []}
    default:
      return state;
  }
}


// return Array.from(concattedCarts)
