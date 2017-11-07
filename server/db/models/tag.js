const Sequelize = require('sequelize')
const db = require('../db')

const Tag = db.define('tag', {
  productId: {
    type: Sequelize.INTEGER
  },
  categoryId: {
    type: Sequelize.INTEGER
  }

})

module.exports = Tag
