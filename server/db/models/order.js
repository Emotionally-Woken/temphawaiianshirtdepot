const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Canceled', 'Completed'),
    defaultValue: 'Created',
    allowNull: false
  }
})

module.exports = Order;