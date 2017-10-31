const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.String,
    defaultValue: 'Created',
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,

  },
  price: Sequelize.DECIMAL
})

module.exports = Order;