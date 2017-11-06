const User = require('./user')
const Review = require('./review')
const Order = require('./order')
const Product = require('./product')
const OrderDetail = require('./orderDetail')
const Category = require('./category')
const Tag = require('./tag')

 User.hasMany(Review)
 Review.belongsTo(User)
 Product.hasMany(Review)
 Review.belongsTo(Product)
 User.hasMany(Order)
 Order.belongsTo(User)
 Product.belongsToMany(Order, {through: OrderDetail})
 OrderDetail.belongsTo(Order)
 Order.hasMany(OrderDetail)
 Category.belongsToMany(Product, {through: 'Tag'})
 Product.belongsToMany(Category, {through: 'Tag'})

module.exports = {
  User, Review, Order, Product, OrderDetail, Category, Tag
}
