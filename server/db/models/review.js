const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  reviewContent: {
    type: Sequelize.TEXT,
    validate: {
      len: [10, 500] // only allow values with length between 50 and 500
  }}
});

module.exports = Review
