import axios from 'axios'

const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
const CREATE_CATEGORY = 'CREATE_CATEGORY'

const getCategories = categories => ({ type: GET_ALL_CATEGORIES, categories})
const createCategory = category => ({type: CREATE_CATEGORY, category})

export const fetchAllCategories = () =>
  dispatch =>
    axios.get('/api/categories')
    .then(categories => {
      console.log("categoriesReducer", categories)
      dispatch(getCategories(categories.data))
    })
    .catch(err => console.log(err))

export const addCategory = (category, history) =>
    dispatch =>
      axios.post('/api/categories', category)
        .then(res => res.data)
        .then(newCategory => {
          console.log("newCategory", newCategory)
          dispatch(createCategory(newCategory))
          history.push(`/`)
        })
        .catch(err => console.log(err))

export default function(categories = [], action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories
    case CREATE_CATEGORY:
    console.log("122sdsfad", )
    console.log("iiii",[action.category, categories])
      return categories.concat(action.category)
    default:
      return categories
  }
}
