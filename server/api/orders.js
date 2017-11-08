const router = require('express').Router()
const {Order, OrderDetail} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  return Order.findAll({include: [{model: OrderDetail}]})
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  return Order.findAll({where: {userId: req.params.userId}, include: [{model: OrderDetail}]})
    .then(orders => res.json(orders))
    .catch(next)
})

router.post('/:userId/create', (req, res, next) => {
  return Order.create({status: 'Active Cart'})
  .then((newOrder => {
    newOrder.setUser(req.params.userId)
    res.json(newOrder)
  }))
  .catch(next)
})

router.put('/createdOrder/', (req, res, next) => {
  return Order.findById(req.body.order.id)
  .then(foundOrder => {
    return foundOrder.update(req.body.order)
  })
  .then(res.json.bind(res))
  .catch()
})

router.put('/', (req, res, next) => {
  return Order.update({status: req.body.status}, {where: {id: req.body.id}})
  .then((updatedOrder => {
    res.json(updatedOrder)
  }))
  .catch(next)
})
