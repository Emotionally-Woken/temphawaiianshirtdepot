import axios from 'axios'

const GET_REVIEWS = 'GET_REVIEWS'
const getReviews = allReviews => ({
    type: GET_REVIEWS,
    allReviews
})

const GET_SINGLE_REVIEW = 'GET_SINGLE_REVIEW'
const getSingleReview = singleReview => ({
    type: GET_SINGLE_REVIEW,
    singleReview
})

const ADD_REVIEW = 'ADD_REVIEW'
const addReview = newReview => ({
    type: ADD_REVIEW,
    newReview
})

export const fetchAllReviews = () =>
    dispatch =>
        axios.get('/api/reviews')
            .then(res => res.data)
            .then(allReviews => {
                dispatch(getReviews(allReviews))
            })
            .catch(err => {
                console.error('Error loading all reviews...', err)
            })

export const fetchSingleReview = reviewId =>
    dispatch =>
        axios.get(`/api/reviews/${reviewId}`)
            .then(res => res.data)
            .then(review => {
                dispatch(getSingleReview(review))
            })
            .catch(err => {
                console.error(`Error loading review with id: ${reviewId}`, err)
            })

export const postReview = review =>
    dispatch => {
        return axios.post('/api/reviews', review)
            .then(res => res.data)
            .then(newReview => {
                dispatch(addReview(newReview))
            })
            .catch(err => console.error('Failed to add review', err.message))
    }

const initialState = {
    allReviews: [],
    singleReview: {}
}

const reviewReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state)
    switch (action.type) {
        case GET_REVIEWS:
            newState.allReviews = action.allReviews; break
        case GET_SINGLE_REVIEW:
            newState.singleReview = action.singleReview; break
        case ADD_REVIEW:
            newState.allReviews = [...state.allReviews, action.newReview]; break
        default:
            return state
    }
    return newState
}

export default reviewReducer
