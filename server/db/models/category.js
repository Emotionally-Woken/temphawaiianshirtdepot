const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  titles: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    defaultValue: ['Classic']
  }
})

module.exports = Category
