const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetail = db.define('orderDetail', {
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: Sequelize.DECIMAL
})

module.exports = OrderDetail