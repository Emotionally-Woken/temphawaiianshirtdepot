const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    defaultValue: ['Classic']
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
   type: Sequelize.DECIMAL,
   allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

Product.prototype.sale = function(percentage) {
  this.salePrice = this.price - (this.price * percentage);
};

module.exports = Product;