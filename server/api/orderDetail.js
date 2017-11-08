const router = require('express').Router()
const { OrderDetail } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  OrderDetail.create(req.body)
    .then(createdOrderDetail => {
      res.status(201).json(createdOrderDetail)
    })
    .catch(next)
})

router.post('/localCart', (req, res, next) => {
  return Promise.all(req.body.orderDetails.map(orderDetail => {
    orderDetail.orderId = req.body.id
    OrderDetail.create(orderDetail)
  }))
    .then(createdOrderDetails => {
      res.status(201).json(createdOrderDetails)
    })
    .catch(next)
})

router.put('/quantities', (req, res, next) => {
  Promise.all(req.body.orderDetails.map(orderDetail => {
    OrderDetail.find({
      where: {
        orderId: req.body.id,
        $and: {productId: orderDetail.productId}
      }
    })
    .then(foundOrderDetail => {
      const newQuantity = foundOrderDetail.quantity + orderDetail.quantity
      foundOrderDetail.update({quantity: newQuantity}) //quantity+= orderDetail.quantity
    })
    .catch()
  }))
  .then(res.json.bind(res))
  .catch()
})

router.put('/:orderId/:productId', (req, res, next) => {
  OrderDetail.find({
    where: {
      orderId: req.params.orderId,
      $and: { productId: req.params.productId }
    }
  })
    .then(orderDetail => {
      orderDetail.update({ quantity: req.body.quantity })
        .then(updatedOrderDetail => {
          res.sendStatus(200).end()
        })
    })
    .catch(next)
})

router.delete(`/:orderId/:productId`, (req, res, next) => {
  OrderDetail.destroy({
    where: {
      orderId: req.params.orderId,
      $and: { productId: req.params.productId }
    }
  })
    .then(() => {
      res.sendStatus(200).end()
    })
    .catch(next)
})
