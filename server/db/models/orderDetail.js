const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const OrderDetail = db.define('orderDetail', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  price: Sequelize.DECIMAL
})

OrderDetail.beforeCreate((orderDetail, options)=>{
  Product.findById(orderDetail.productId)
  .then(product => {
    if (orderDetail.quantity > product.quantity) {
      throw new Error("Amount exceeds inventory")
    }
  })
  .catch(console.error)
})
module.exports = OrderDetail