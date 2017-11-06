import axios from 'axios'

const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

const getCategories = categories => ({ type: GET_ALL_CATEGORIES, categories})

export const fetchAllCategories = () =>
  dispatch =>
    axios.get('/api/categories')
    .then(categories => {
      console.log("categoriesReducer", categories)
      dispatch(getCategories(categories))
    })
    .catch(err => console.log(err))

export default function(categories = [], action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories
    default:
      return categories
  }
}
