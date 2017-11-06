const router = require('express').Router()
const {Product} = require('../db/models')
const Op = require('sequelize').Op
const http = require('http')
module.exports = router

router.param('id', function (req, res, next, id) {
  Product.findById(id)
  .then(product =>  {
    if (!product) res.sendStatus(404)
    req.product = product
    console.log("reqProduct", req.product)
    next()
  })
  .catch(next)
});

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.json(product))
    .catch(next)
})

// router.put('/:productId', (req, res, next) => {
//   Product.update(req.body, {where: {id: req.params.productId}, returning: true})
//     .then((updatedProduct) => {
//       res.json(updatedProduct)
//     })
//     .catch(next)
// })

router.put('/:id', (req, res, next) => {
  console.log("PRODUCTIOOONN", req.body)
  req.product.update(req.body)
    .then((updatedProduct) => {
      console.log("updatedddd", updatedProduct)
      res.json(updatedProduct)
    })
    .catch(next)
})
