const router = require('express').Router()
module.exports = router

// Route - /api/users
router.use('/users', require('./users'))

// Route - /api/cart
router.use('/cart', require('./cart'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
