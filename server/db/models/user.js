const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Chance = require('chance')
const chance = new Chance()
//changed
const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    defaultValue: chance.first()
  },
  lastName: {
    type: Sequelize.STRING,
    defaultValue: chance.last()
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  city: {
    type: Sequelize.STRING,
    defaultValue: chance.city()
  },
  state: {
    type: Sequelize.STRING,
    defaultValue: chance.state()
  },
  zip: {
    type: Sequelize.INTEGER,
    defaultValue: chance.zip()
  },
  shippingAddress: {
    type: Sequelize.STRING,
    default: chance.address()
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

User.prototype.name = function(){
  return this.firstName + ' ' + this.lastName
}
/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
