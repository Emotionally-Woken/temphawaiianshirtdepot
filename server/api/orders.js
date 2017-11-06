const router = require('express').Router()
const {Order, OrderDetail} = require('../db/models')
module.exports = router

router.get('/all', (req, res, next) => {
  Order.findAll({include: [{model: OrderDetail}]})
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  Order.findAll({where: {userId: req.params.userId}, include: [{model: OrderDetail}]})
    .then(orders => res.json(orders))
    .catch(next)
})

router.post('/:userId/create', (req, res, next) => {
  Order.create({status: 'Active Cart'})
  .then((newOrder => {
    newOrder.setUser(req.params.userId)
    res.json(newOrder)
  }))
  .catch(next)
})
