const router = require('express').Router()
const {Category} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Category.create(req.body)
    .then(category => res.json(category))
    .catch(next)
})
