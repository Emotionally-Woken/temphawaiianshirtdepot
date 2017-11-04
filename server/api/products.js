const router = require('express').Router()
const {Product} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll({ where: {quantity: {[Op.gt]: 0}}

  })
    .then(products => res.json(products))
    .catch(next)
})

router.post('/', (req, res, next) => {
  console.log("reqBody: ", req.body)
  Product.create(req.body)
    .then(product => res.json(product))
    .catch(next)
})
