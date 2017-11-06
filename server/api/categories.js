const router = require('express').Router()
const {Category} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next)
})
