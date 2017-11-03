const router = require('express').Router()
const {Order, OrderDetail} = require('../db/models')
module.exports = router

router.get('/:userId', (req, res, next) => {
  Order.findAll({where: {userId: req.params.userId}, include: [{model: OrderDetail}]})
    .then(orders => res.json(orders))
    .catch(next)
})
