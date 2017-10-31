const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalCost: {
    type: Sequelize.VIRTUAL,
    get(){
      //if we have multiple items on an order ?
    }
  },
  quantity: Sequelize.JSON, //{size: quantity}
  productId: Sequelize.STRING,
  orderStatus: {
    type: Sequelize.ENUM('Created, Processing, Cancelled, Complete'),
    defaultValue: 'Created',
    allowNull: false
  },
  timeBought: Sequelize.TIME
})

module.exports = Order;
