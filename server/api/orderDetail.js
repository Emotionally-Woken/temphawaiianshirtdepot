const router = require('express').Router()
const { Order, OrderDetail } = require('../db/models')
module.exports = router

router.post('/:orderId/new', (req, res, next) => {
  req.body.orderId = req.params.orderId
  OrderDetail.create(req.body)
    .then(createdOrderDetail => {
      res.json(createdOrderDetail)
    })
    .catch(next)
})

router.post('/bulkNew', (req, res, next) => {
  Promise.all(req.body.orderDetails.map(orderDetail => {
    orderDetail.orderId = req.body.id
    OrderDetail.create(orderDetail)
      .then()
      .catch(next)
  }))
    .then(res.json.bind(res))
    .catch(next)
})

router.put('/bulkUpdate', (req, res, next) => {
  Promise.all(req.body.orderDetails.map(orderDetail => {
    OrderDetail.find({
      where: {
        orderId: req.body.id,
        $and: {productId: orderDetail.productId}
      }
    })
    .then(foundOrderDetail => {
      foundOrderDetail.update({quantity: orderDetail.quantity})
    })
    .catch()
  }))
  .then(res.json.bind(res))
  .catch()
})

router.put('/update/:orderId/:productId', (req, res, next) => {
  OrderDetail.find({
    where: {
      orderId: req.params.orderId,
      $and: { productId: req.params.productId }
    }
  })
    .then(orderDetail => {
      orderDetail.update({ quantity: req.body.quantity })
        .then(updatedOrderDetail => {
          res.sendStatus(201).end()
        })
    })
    .catch(next)
})

router.delete(`/remove/:orderId/:productId`, (req, res, next) => {
  OrderDetail.destroy({
    where: {
      orderId: req.params.orderId,
      $and: { productId: req.params.productId }
    }
  })
    .then(destroyed => {
      res.sendStatus(200).end()
    })
    .catch(next)
})
