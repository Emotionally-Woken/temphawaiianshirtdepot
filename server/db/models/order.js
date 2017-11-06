const Sequelize = require('sequelize')
const db = require('../db')
const OrderDetail = require('./orderDetail')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM( 'Active Cart', 'Created', 'Processing', 'Canceled', 'Completed'),
    defaultValue: 'Created',
    allowNull: false
  }
}, {
  defaultScope: {include: [ OrderDetail ]}
})

Order.getStatusWhere = (orderStatus) => {
  Order.findAll({where: {status: orderStatus}})
  .then(foundOrders => {
    return foundOrders
  })
  .catch(console.error)
} 

module.exports = Order;