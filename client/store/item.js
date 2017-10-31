import axios from 'axios';

const GET_ITEMS = 'GET_ITEMS';
const UPDATE_ORDER_ITEM = 'UPDATE_ORDER_ITEM';
const DELETE_ORDER_ITEM = 'DELETE_ORDER_ITEM';

const getItems = items => ({
  type: GET_ITEMS, items
});

const updateItem = item => ({
  type: UPDATE_ORDER_ITEM, item
});

const deleteItem = item => ({
  type: DELETE_ORDER_ITEM, item

}); //if i want to get all orderdetail items and then get the specific 
//-----------------------------------------------------
export const fetchItems = () => (dispatch) => {
  axios.get(`/api/orderDetails/${id}`)
    .then(res => res.data)
    .then(items => {
      dispatch(getItems(items));
    })
    .catch(error =>
      console.error('Error fetching all orderItems', error));
};

export const changeItem = itemId => dispatch => {
  axios.put(`/api/product/${itemId}`)
    .then(res => res.data)
    .then(item => dispatch(updateItem(item)))
    .catch(error =>
      console.error('Error updating item...', error));
};

export const removeItem = id => (dispatch) => {
  axios.delete(`/api/product/${id}`)
    .then(() =>
      dispatch(deleteItem(id)))
    .catch(error =>
      console.error('Error deleting item...', error));
};

//--------------------------------------------------------
export default function itemReducer(state = [], action) {

  switch (action.type) {
    case UPDATE_ORDER_ITEM:
      return state.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        } else {
          return item;
        }
      });
    case DELETE_ORDER_ITEM:
      return state.filter(item => item.id !== action.item.id);
    default:
      return state;
  }
}
