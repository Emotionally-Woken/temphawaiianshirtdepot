const User = require('./user')
const Review = require('./review')
const Order = require('./order')
const Product = require('./product')
const OrderDetail = require('./orderDetail')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 User.hasMany(Review)
 Review.belongsTo(User)
 Product.hasOne(Review)
 User.hasMany(Order)
 Product.belongsToMany(Order, {through: OrderDetail})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Review, Order, Product, OrderDetail
}
