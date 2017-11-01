const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.get('/:reviewId', (req, res, next) => {
  Review.findOne({where: {id: req.params.reviewId}})
    .then(review => res.json(review))
    .catch(next)
})

router.post('/', (req, res, next) => {
  let {stars, reviewContent, userId, productId} = req.body
  Review.create(req.body)
    .then(createdReview => res.json(createdReview))
    .catch(next)
})
